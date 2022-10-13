import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public categories: Category[];
    displayedColumns: string[] = ['actions', 'name'];
    Test: Category;
    constructor(private modalService: NgbModal, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        http.get<Category[]>(baseUrl + 'weatherforecast/getcategories').subscribe(result => {
            this.categories = result;
        }, error => console.error(error));
    }

    onClick(test: string) {
        this.Test = new Category();
        this.Test.id = 5;
        this.Test.name = 'TEST';
        this.categories.push(this.Test);
    }
    openLg(content) {
        this.modalService.open(content, { size: 'lg' });
    }
}

interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

class Category {
    id: number;
    name: string;
}
