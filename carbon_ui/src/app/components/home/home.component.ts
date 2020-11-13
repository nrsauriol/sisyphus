import { Component, OnInit } from '@angular/core';
import { IbmService } from '../../services/ibm.service';
import { TestRequest } from '../../models/test';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  static notificationCount = 0;

  skeletonInput = true;
  notificationId = `notification-${HomeComponent.notificationCount}`;
  files = new Set();
  accept = [".js"];
  skeleton = true;
  disabled = false;
  skeletonSelect = true;
  isActiveLoading = false;

  // Parameters
  token = '';
  apiKey = '';
  bucketName = 'nightwatch-function';
  region = 'us-south';
  functionEndpoint = '';
  namespace = '';
  serviceInstanceId = '';
  seleniumHost = '';
  seleniumPort = '80';
  iterations = 1;
  functionName = '';

  data: any =[];

  constructor(
    private ibmService: IbmService,
  ) {
    HomeComponent.notificationCount++;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.skeleton = false;
      this.skeletonInput = false;
      this.skeletonSelect = false;
    }, 2000);
  }

  onUpload() {
    this.files.forEach((fileItem: any) => {
      if (!fileItem.uploaded) {
        // Upload File
        this.ibmService.uploadFile(fileItem, this.token, this.serviceInstanceId, this.bucketName, this.region)
          .then(data => {
            this.functionName = data;
          }).catch(err => {
            this.functionName = '';
          });
      }
    });
  }


  async sendTest() {
    if (this.functionName && this.iterations > 0 ) {
      this.isActiveLoading = true;
      for (let index = 0; index < this.iterations; index++) {
        let uuid = new Date().getTime().toString();
        await this.ibmService.sendTest(
          {
            apiKey: this.apiKey,
            bucketName: this.bucketName,
            functionEndpoint: this.functionEndpoint,
            function_id: uuid,
            region: this.region,
            seleniumHost: this.seleniumHost,
            seleniumPort: this.seleniumPort,
            test_path: this.functionName
          } as TestRequest,
          this.token
        ).then((resp:any) => {
          const interval = setInterval(async ()=>{
            await this.getComplements(resp,interval);
            if(this.data.length == this.iterations){
              this.isActiveLoading = false;
            }
          },5000);
        }).catch(err => {
          console.error(err);
        });
      }
    } else {
      alert('Please upload a function.');
    }
    
  }

  private async getComplements(resp, interval) {
    await this.ibmService.getLogs(this.token,this.namespace, resp.activationId)
      .then(async logs=>{
        if(!logs.status){
          let obj: any ={
            activationId: resp.activationId,
            logs: logs
          }
          await this.ibmService.getImages(resp.id, this.bucketName, this.region)
            .then(images=>{
              obj.images = images;
              this.data.push(obj);
              clearInterval(interval);
            }).catch(err=>{
              console.error(err);
            });
        }
      }).catch(err=>{
        console.error(err);
      });
  }

}
