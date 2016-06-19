import {Component, Input, ContentChildren, QueryList, AfterViewInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import {Menu} from 'components/dropdown-menu/dropdown-menu';

@Component({
	selector: 				'tab',
	styles: 					[`
		.pane {
			padding: 1em;
			background-color: rgba(51,51,51,0.4);
		}
		.hide {
			display: none;
		}
	`],
	template: 				`
		<div class="pane max-height">
			<ng-content></ng-content>
		</div>
	`,
	host:							{
		'[class.hide]':				'!active',
		'[class.max-height]':	'active'
	},
	changeDetection:	ChangeDetectionStrategy.OnPush
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input() active = false;
	@Input() menu;
}
 
@Component({
  selector: 				'tabs',
	template:`
		<ul class="nav nav-tabs">
			<li *ngFor="let tab of tabs; let i = index" (click)="selectTab(tab)" [class.active]="tab.active" [style.min-height.px]="minHeight" class="tab">
				{{tab.title}}
				<div class="dropdown" *ngIf="tab.menu">
					<span class="caret inline-block" style="margin-top: 60%;" data-toggle="dropdown"></span>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
						<li><a href="#">New Empty Tab</a></li>
						<li><a href="#">One Column Two Rows</a></li>
						<li *ngFor="let menuItem of tab.menu"><a href="#" (click)="addTab(menuItem)">{{menuItem.tabTitle}}</a></li>
					</ul>
				</div>
				<i *ngIf="!tab.menu" class="fa fa-times close-tab" (click)="close($event, i)"></i>
			</li>
		</ul>
		<div style="height: calc(100% - 30px);"><ng-content></ng-content></div>
	`,
	styles: 					[`
		li.tab {
			position:							relative;
			display:							block;
			padding:							5px 10px;
			line-height:					1.428571429;
			border-radius:				3px 3px 0 0;
			border-bottom-color:	transparent;
			cursor:								default;
    	background-color:			rgba(51,51,51,0.4);
			margin:								0 2px 2px 0;
		}
		li.tab:hover {
			background-color: #eeeeee;
			border-color: #eeeeee #eeeeee #ddd;
			color: #666;
		}
		li.tab.active {
			bottom-border:		2px solid rgba(51,51,51,0.4);
			padding-bottom:		7px;
			margin-bottom:		0;
		}
		.close-tab {
			cursor:						pointer;
		}
		.close-tab:hover {
			color:						black;
		}
	`],
	directives:				[Menu]
})
export class Tabs implements AfterViewInit {
	@ContentChildren(Tab) tabs: QueryList<Tab>;
	@Output() menuSelect = new EventEmitter();
	@Output() closeTab = new EventEmitter();
	@Input("tab-min-height") minHeight;
	
	constructor(private cd: ChangeDetectorRef) {}
	ngAfterViewInit() {
		// get all active tabs
		let activeTabs = this.tabs.filter((tab)=>tab.active);

		// if there is no active tab set, activate the first
		if(activeTabs.length === 0) {
			this.selectTab(this.tabs.first);
		}
	}
	selectTab = (tab: Tab) => {
		if(tab.menu) {
			
		} else {
			this.tabs.toArray().forEach(tab => tab.active = false);
			tab.active = true;
		}
	}
	stopProp(e) {
		e.stopPropagation();
	}
	addTab(newTab) {
		this.menuSelect.emit({
			tab: newTab,
			callback: this.selectTab
		});
	}
	close = (e, index) => {
		e.stopPropagation();
		this.closeTab.emit(index);
	}
}