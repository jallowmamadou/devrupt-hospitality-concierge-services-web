import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { ChatsComponent } from './guest/components/chats/chats.component';
import { GuestAuthGuard } from './guards/guest-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'guest/chats',
    component: ChatsComponent,
  },
  {
    path: 'installation',
    loadChildren: () =>
      import('./installation/installation.module').then(
        (m) => m.InstallationPageModule
      ),
  },
  {
    path: 'guest',
    canActivate: [GuestAuthGuard],
    loadChildren: () =>
      import('./guest/guest.module').then((m) => m.GuestPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
