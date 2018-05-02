import { Component, OnInit } from "@angular/core";
import { FieldService } from "../services/field.service";
import { LocalDataSource } from "ng2-smart-table";
import { UserService } from "../services/user.service";
import * as moment from "moment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  providers: [FieldService]
})
export class DashboardComponent implements OnInit {
  singleB = [
    {
      name: "Canchas Alquiladas Hoy",
      value: 0
    }
  ];
  // multi: any;
  multi: any[] = [
    {
      name: "Cancha 1",
      series: [
        {
          name: "2018-04-09 de 10 a 11",
          value: 0
        }
      ]
    }
  ];

  view: any[] = [650, 400];

  viewB: any[] = [300, 400];

  haveRentedFieldsToday = false;

  // options
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "FECHA";
  showYAxisLabel = false;
  timeline = true;
  yAxisLabel = "CANCHA";

  legendTitle = "Canchas";

  // options
  showXAxisB = true;
  showYAxisB = false;
  gradientB = false;
  showLegendB = false;
  showXAxisLabelB = true;
  xAxisLabelB = "FECHA";
  showYAxisLabelB = false;
  yAxisLabelB = "CANCHA";

  // line, area
  autoScale = true;

  totalRegisteredUsers = "";

  totalRentedFields = "";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  source: LocalDataSource;

  constructor(
    private fieldService: FieldService,
    private userService: UserService
  ) {}

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  //   this.haveRentedFieldsToday = false;
  //   this.fieldService.getAllRents().subscribe(allRents => {
  //     let countT = 0;
  //     this.totalRentedFields = String(allRents.length);
  //     let data = [];
  //     let dataB = [];
  //     for (let rent of allRents) {
  //       let rentDY = rent.rentedTime.split(" de ");
  //       if (
  //         moment(rentDY[0]).format("YYYY-MM-DD") ===
  //         moment().format("YYYY-MM-DD")
  //       ) {
  //         this.haveRentedFieldsToday = true;
  //         countT = countT + 1;
  //         dataB.push({ name: "Canchas Alquiladas Hoy", value: countT });
  //       }
  //       data.push({
  //         name: rent.fieldName,
  //         series: [{ name: rent.rentedTime, value: rent.idField }]
  //       });
  //       this.singleB = dataB;
  //       this.multi = data;
  //     }
  //   });
  //   this.userService.getAll().subscribe(userResponse => {
  //     this.totalRegisteredUsers = String(userResponse.length);
  //   });
  }
}
