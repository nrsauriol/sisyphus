import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { TestRequest } from '../models/test';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class IbmService {

	constructor(
		private http: HttpClient,
		private xmlToJson: NgxXml2jsonService
	) { }

	sendTest(req: TestRequest, token) {
		return this.http.post(req.functionEndpoint, {
			apikey: [req.apiKey],
			bucket_name: [req.bucketName],
			host: [req.seleniumHost],
			port: [req.seleniumPort],
			region: [req.region],
			test_path: [req.test_path],
			function_id: [req.function_id]
		}, {
			headers: new HttpHeaders().append("Accept", "application/json")
				.append("Authorization", `Bearer ${token}`)
		}).toPromise().then((resp: any) => {
			return {
				id: req.function_id,
				activationId: resp.activationId
			};
		}).catch(err => {
			console.log(err);
			return err;
		});
	}

	uploadFile(fileItem, token, serviceInstanceId, bucketName, region) {
		fileItem.state = "upload";
		let functionName = `${new Date().getTime()}-nightwatch-test.js`;
		let httpHeaders = new HttpHeaders()
			.append('ibm-service-instance-id', serviceInstanceId)
			.append('Authorization', `Bearer ${token}`)
			.append('x-amz-acl', 'public-read')
			.append('Content-Type', 'text/javascript');
		return this.http.put(`https://s3.${region}.cloud-object-storage.appdomain.cloud/${bucketName}/${functionName}`, fileItem.file, {
				headers: httpHeaders
			}).toPromise().then(res => {
				fileItem.state = "complete"
				fileItem.uploaded = true;
				return functionName;
			}).catch(err => {
				console.log(err);
				fileItem.state = "edit";
				fileItem.invalid = true;
				fileItem.invalidText = "Error Upload File";
				return err;
			});
	}

	getImages(id: String, bucketName, region) {
		let url = `https://s3.${region}.cloud-object-storage.appdomain.cloud/${bucketName}`;
		return this.http.get(url, { responseType: 'text' })
			.toPromise().then(res => {
				const parser = new DOMParser();
				const xml = parser.parseFromString(res, 'text/xml');
				const obj: any = this.xmlToJson.xmlToJson(xml);
				const data = obj.ListBucketResult.Contents;
				return data.filter(data => data.Key.startsWith(id))
					.flatMap(images => {
						return `${url}/${images.Key}`;
					});
			})
			.catch(err => {
				console.log(err);
			});
	}

	getLogs(token, namespace, activationId) {
		let httpHeaders = new HttpHeaders()
			.append('Authorization', `Bearer ${token}`)
			.append('Accept', 'application/json');

		return this.http.get(`https://us-south.functions.cloud.ibm.com/api/v1/namespaces/${namespace}/activations/${activationId}/logs`,
		{headers: httpHeaders}).toPromise()
		.then((res: any)=>{
			return res.logs.map(line=>{
				return line.substring(line.indexOf('stdout:')+7);
			});
		})
		.catch(err=>{
			return err;
		});
	}

}
