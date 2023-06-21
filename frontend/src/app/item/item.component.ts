import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  currentItem: any = {};
  searchTerm: string = '';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe((items) => {
        this.items = items;
      });
  }

  getItemById(id: string): void {
    this.itemService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  createItem(item: any): void {
    this.itemService.createItem(item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
      });

      Swal.fire({
        icon: 'success',
        title: 'Elemento creado',
        text: 'El elemento se ha creado correctamente.',
        confirmButtonText: 'OK'
      });
  }

  updateItem(id: string, item: any): void {
    this.itemService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
      });

      Swal.fire({
        icon: 'success',
        title: 'Elemento actualizado',
        text: 'El elemento se ha actualizado correctamente.',
        confirmButtonText: 'OK'
      });
  }

  deleteItem(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de eliminar el elemento?',
      text: 'El elemento se borrará',
      confirmButtonText: 'ELIMINAR'
    }).then((result) => {
      if (result.value) {
        this.itemService.deleteItem(id)
        .subscribe(() => {
          this.getItems();
        });
      }
  });
  }

  editItem(id: string): void {
    this.getItemById(id);
  }
}
