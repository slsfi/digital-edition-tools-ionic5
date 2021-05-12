import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { TocItem } from 'src/app/models/toc';
import { Publication } from 'src/app/models/publication';

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
  dropTocTargetIds = [];
  dropPubTargetIds = [];
  nodeLookup = {};
  pubLookup = {};
  dropActionTodo: DropInfo = null;

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    if( this.tocData ) {
      this.prepareDragDrop(this.tocData);
    }
    if( this.publicationData ) {
      this.preparePubDragDrop(this.publicationData);
    }
  }

  prepareDragDrop(nodes: TocItem[]) {
    nodes.forEach(node => {
        this.dropTocTargetIds.push(node.id);
        this.nodeLookup[node.id] = node;
        this.prepareDragDrop(node.children);
    });
  }

  preparePubDragDrop(nodes: Publication[]) {
    nodes.forEach(node => {
        this.dropPubTargetIds.push(node.id);
        this.nodeLookup[node.id] = node;
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


  drop(event) {
      if (!this.dropActionTodo) return;

      const draggedItemId = event.item.data;
      const parentItemId = event.previousContainer.id;
      const targetListId = this.getParentNodeId(this.dropActionTodo.targetId, this.tocData, 'main');

      console.log(
          '\nmoving\n[' + draggedItemId + '] from list [' + parentItemId + ']',
          '\n[' + this.dropActionTodo.action + ']\n[' + this.dropActionTodo.targetId + '] from list [' + targetListId + ']');

      const draggedItem = this.nodeLookup[draggedItemId];

      const oldItemContainer = parentItemId != 'main' ? this.nodeLookup[parentItemId].children : this.tocData;
      const newContainer = targetListId != 'main' ? this.nodeLookup[targetListId].children : this.tocData;

      let i = oldItemContainer.findIndex(c => c.id === draggedItemId);
      oldItemContainer.splice(i, 1);

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
      for (let node of nodesToSearch) {
          if (node.id == id) return parentId;
          let ret = this.getParentNodeId(id, node.children, node.id);
          if (ret) return ret;
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
