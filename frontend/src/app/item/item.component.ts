import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';  // Import the Item model

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  item: Item = { _id: '', name: '', description: '', price: 0 };  // Make sure to initialize with _id as string
  errorMessage: string = '';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load items. Please try again later.';
        console.error('Error fetching items:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.item._id) {
      // Update item
      this.itemService.updateItem(this.item).subscribe(
        () => {
          this.fetchItems();
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Failed to update item. Please try again later.';
          console.error('Error updating item:', error);
        }
      );
    } else {
      // Add item
      this.itemService.addItem(this.item).subscribe(
        () => {
          this.fetchItems();
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Failed to add item. Please try again later.';
          console.error('Error adding item:', error);
        }
      );
    }
  }

  onEdit(item: Item): void {
    this.item = { ...item };  // Use the _id from the selected item
  }

  onDelete(id: string): void {
    if (id) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.itemService.deleteItem(id).subscribe(
          () => {
            this.fetchItems();  // Refresh the list after deletion
          },
          (error) => {
            this.errorMessage = 'Failed to delete item. Please try again later.';
            console.error('Error deleting item:', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Invalid item ID for deletion.';
    }
  }

  resetForm(): void {
    this.item = { _id: '', name: '', description: '', price: 0 };
  }
}
