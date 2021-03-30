import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
    selector: 'app-installation',
    templateUrl: './installation.page.html',
    styleUrls: ['./installation.page.scss'],
})
export class InstallationPage implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) {
    }

    ngOnInit() {
        this.adminService.startInstallation().then((install) => {
            console.log({install});
            return this.router.navigateByUrl('admin/chats?propertyId=BER')
        })
    }

}
