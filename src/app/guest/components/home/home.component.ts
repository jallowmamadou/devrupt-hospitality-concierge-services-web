import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, ObservedValueOf, of } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { AdminService } from '../../../services/admin.service';
import { ApaleoBookingService } from '../../../services/apaleo-booking.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public vm$: Observable<{
    reservation: ObservedValueOf<Observable<Data>>;
    property: any;
    folios: any;
  }>;
  public property: any;
  displayedColumns: string[] = ['Service'];
  dataSource = ELEMENT_DATA;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private adminService: AdminService,
    private apaleoBookingService: ApaleoBookingService
  ) {}

  ngOnInit(): void {
    const { reservation } = this.activatedRoute.snapshot.data;

    this.property = reservation.property;
    this.storage.set('guest', reservation.primaryGuest);
    this.storage.set('property', reservation.property);
    const property$ = this.adminService.findProperty(this.property.id);
    const folios$ = this.adminService.getReservationFolios(reservation.id);
    this.vm$ = combineLatest([of(reservation), property$, folios$]).pipe(
      map(([reservation, property, folios]) => ({
        reservation,
        property,
        folios,
      }))
    );

    this.apaleoBookingService
      .saveGuestReservation(reservation.id, this.property.id)
      .then();
  }

  async checkout(id: string) {
    await this.adminService.checkout(id);

    window.location.reload();
  }
}
