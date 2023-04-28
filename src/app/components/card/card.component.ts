import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardModel } from 'src/app/model/card-model';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit{

  listCards:  CardModel[] = [];
  formCard: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private cardService: CardService){}

  ngOnInit(): void {
     this.list();
     this.formCard = new FormGroup({
      id_card: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      typer: new FormControl(''),
      cvv: new FormControl(''),
      status: new FormControl('1')
     }) 
  }

  list(){
    this.cardService.getCards().subscribe(resp => {
      if (resp) {
        this.listCards = resp;
      }
    })
  }

  save(){
    this.formCard.controls['status'].setValue(1);
    this.cardService.saveCards(this.formCard.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCard.reset();
      }
    })
  }

  update(){
    this.cardService.updateCards(this.formCard.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCard.reset();
      }
    })
  }

  delete(id: any){
    this.cardService.deleteCards(id).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCard.reset();
      }
    })
  }

  newCard(){
    this.isUpdate = false;
    this.formCard.reset();
  }

  selectItem(item: any){
    this.isUpdate =true;
    this.formCard.controls['id_card'].setValue(item.id_card);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['typer'].setValue(item.typer);
    this.formCard.controls['cvv'].setValue(item.id_card);
  }
}
