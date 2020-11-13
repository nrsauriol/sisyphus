import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from '@carbon/icons-angular';
import { UserAvatarModule } from '@carbon/icons-angular';
import { AppSwitcherModule } from '@carbon/icons-angular';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { 
  FileUploaderModule, 
  GridModule, 
  DropdownModule, 
  UIShellModule, 
  ButtonModule, 
  InputModule, 
  LoadingModule
} from 'carbon-components-angular';
import { SliderCarouselModule } from 'slider-carousel';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SliderCarouselModule,
    ButtonModule,
		UIShellModule,
		NotificationModule,
		UserAvatarModule,
		AppSwitcherModule,
		FileUploaderModule,
		InputModule,
		GridModule,
		FormsModule,
    DropdownModule,
    LoadingModule
  ],
  exports:[
    HeaderComponent,
    HomeComponent
  ]
})
export class ComponentsModule { }
