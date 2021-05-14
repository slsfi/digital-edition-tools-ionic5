import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { TocItem } from 'src/app/models/toc';
import { Publication } from 'src/app/models/publication';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as uuid from 'uuid';

export interface DropInfo {
  targetId: string;
  action?: string;
}

@Component({
  selector: 'app-toc-grid',
  templateUrl: './toc-grid.component.html',
  styleUrls: ['./toc-grid.component.scss'],
})
export class TocGridComponent implements OnInit {
  @Input() tocData: TocItem[];
  @Input() publicationData: Publication[];

  // ids for connected drop lists
  dropTargetIds = [];
  nodeLookup = {};
  pubLookup = {};
  dropActionTodo: DropInfo = null;

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    if( this.tocData ) {
      this.prepareDragDrop(this.tocData);
    }
  }

  prepareDragDrop(nodes: TocItem[]) {
    nodes.forEach(node => {
        this.dropTargetIds.push(node.id);
        this.nodeLookup[node.id] = node;
        this.prepareDragDrop(node.children);
    });
  }

  dragMoved(event) {
      let e = this.document.elementFromPoint(event.pointerPosition.x,event.pointerPosition.y);

      if (!e) {
          this.clearDragInfo();
          return;
      }
      let container = e.classList.contains("node-item") ? e : e.closest(".node-item");
      if (!container) {
          this.clearDragInfo();
          return;
      }
      this.dropActionTodo = {
          targetId: container.getAttribute("data-id")
      };
      const targetRect = container.getBoundingClientRect();
      const oneThird = targetRect.height / 3;

      if (event.pointerPosition.y - targetRect.top < oneThird) {
          // before
          this.dropActionTodo["action"] = "before";
      } else if (event.pointerPosition.y - targetRect.top > 2 * oneThird) {
          // after
          this.dropActionTodo["action"] = "after";
      } else {
          // inside
          this.dropActionTodo["action"] = "inside";
      }
      this.showDragInfo();
  }


  drop(event, parentContainerId) {
    console.log('container.id:' + parentContainerId)

    //AgGridModuleconsole.log('event:' + JSON.stringify(event));
      if (!this.dropActionTodo) return;

      let draggedItemId = event.item.data;
      const parentItemId = event.previousContainer.id;
      let dataPool = [];

      if ( parentContainerId === 'publications' ){
        dataPool = this.publicationData;
      } else {
        dataPool = this.tocData;
      }


      const targetListId = this.getParentNodeId(this.dropActionTodo.targetId, dataPool, parentContainerId);

      console.log(
          '\nmoving\n[' + draggedItemId + '] from list [' + parentItemId + ']',
          '\n[' + this.dropActionTodo.action + ']\n[' + this.dropActionTodo.targetId + '] from list [' + targetListId + ']');


      let oldItemContainer = [];
      if ( parentItemId !== parentContainerId && parentItemId !== 'publications' ) {
        if ( this.nodeLookup[parentItemId].children !== undefined ) {
          oldItemContainer = this.nodeLookup[parentItemId].children;
        }
        let i = oldItemContainer.findIndex(c => c.id === draggedItemId);
        oldItemContainer.splice(i, 1);
      } else if ( parentItemId === 'publications' && targetListId !== 'publications' && targetListId !== null ) {
        let i = this.publicationData.findIndex(c => c.id === draggedItemId);
        const item = this.publicationData.splice(i, 1)[0];
        const newTocItem = new TocItem({'text': item.name});
        newTocItem.children = [];
        newTocItem.id = uuid.v4();
        newTocItem.itemId = item.publication_collection_id + '_' + item.id;
        newTocItem.collectionId = String(item.publication_collection_id);
        this.dropTargetIds.push(newTocItem.id);
        this.nodeLookup[newTocItem.id] = newTocItem;
        this.tocData.push(newTocItem);
        draggedItemId = newTocItem.id;
      } else {
        oldItemContainer = dataPool;
        let i = oldItemContainer.findIndex(c => c.id === draggedItemId);
        oldItemContainer.splice(i, 1);
      }

      const draggedItem = this.nodeLookup[draggedItemId];
      const newContainer = (targetListId !== parentContainerId && parentContainerId !== 'publications') ? this.nodeLookup[targetListId].children : dataPool;


      switch (this.dropActionTodo.action) {
          case 'before':
          case 'after':
              const targetIndex = newContainer.findIndex(c => c.id === this.dropActionTodo.targetId);
              if (this.dropActionTodo.action == 'before') {
                  newContainer.splice(targetIndex, 0, draggedItem);
              } else {
                  newContainer.splice(targetIndex + 1, 0, draggedItem);
              }
              break;

          case 'inside':
              this.nodeLookup[this.dropActionTodo.targetId].children.push(draggedItem)
              this.nodeLookup[this.dropActionTodo.targetId].collapsed = false;
              break;
      }

      this.clearDragInfo(true)
  }
  getParentNodeId(id: string, nodesToSearch: TocItem[], parentId: string): string {
      try {
        if ( nodesToSearch !== undefined && nodesToSearch.length > 0 && nodesToSearch[0] !== undefined ) {
          for (let node of nodesToSearch) {
            if (node.id == id) return parentId;
            let ret = this.getParentNodeId(id, node.children, node.id);
            if (ret) return ret;
          }
        }
      } catch (error) {
        console.log(error);
      }

      return null;
  }

  showDragInfo() {
      this.clearDragInfo();
      if (this.dropActionTodo) {
        this.document.getElementById("node-" + this.dropActionTodo.targetId).classList.add("drop-" + this.dropActionTodo.action);
      }
  }

  clearDragInfo(dropped = false) {
      if (dropped) {
          this.dropActionTodo = null;
      }
      this.document
          .querySelectorAll(".drop-before")
          .forEach(element => element.classList.remove("drop-before"));
      this.document
          .querySelectorAll(".drop-after")
          .forEach(element => element.classList.remove("drop-after"));
      this.document
          .querySelectorAll(".drop-inside")
          .forEach(element => element.classList.remove("drop-inside"));
  }
}
