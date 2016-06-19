"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var dropdown_menu_1 = require('components/dropdown-menu/dropdown-menu');
var Tab = (function () {
    function Tab() {
        this.active = false;
    }
    __decorate([
        core_1.Input('tabTitle'), 
        __metadata('design:type', String)
    ], Tab.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tab.prototype, "active", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tab.prototype, "menu", void 0);
    Tab = __decorate([
        core_1.Component({
            selector: 'tab',
            styles: ["\n\t\t.pane {\n\t\t\tpadding: 1em;\n\t\t\tbackground-color: rgba(51,51,51,0.4);\n\t\t}\n\t\t.hide {\n\t\t\tdisplay: none;\n\t\t}\n\t"],
            template: "\n\t\t<div class=\"pane max-height\">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t",
            host: {
                '[class.hide]': '!active',
                '[class.max-height]': 'active'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], Tab);
    return Tab;
}());
exports.Tab = Tab;
var Tabs = (function () {
    function Tabs(cd) {
        var _this = this;
        this.cd = cd;
        this.menuSelect = new core_1.EventEmitter();
        this.closeTab = new core_1.EventEmitter();
        this.selectTab = function (tab) {
            if (tab.menu) {
            }
            else {
                _this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
                tab.active = true;
            }
        };
        this.close = function (e, index) {
            e.stopPropagation();
            _this.closeTab.emit(index);
        };
    }
    Tabs.prototype.ngAfterViewInit = function () {
        // get all active tabs
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    Tabs.prototype.stopProp = function (e) {
        e.stopPropagation();
    };
    Tabs.prototype.addTab = function (newTab) {
        this.menuSelect.emit({
            tab: newTab,
            callback: this.selectTab
        });
    };
    __decorate([
        core_1.ContentChildren(Tab), 
        __metadata('design:type', core_1.QueryList)
    ], Tabs.prototype, "tabs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Tabs.prototype, "menuSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Tabs.prototype, "closeTab", void 0);
    __decorate([
        core_1.Input("tab-min-height"), 
        __metadata('design:type', Object)
    ], Tabs.prototype, "minHeight", void 0);
    Tabs = __decorate([
        core_1.Component({
            selector: 'tabs',
            template: "\n\t\t<ul class=\"nav nav-tabs\">\n\t\t\t<li *ngFor=\"let tab of tabs; let i = index\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\" [style.min-height.px]=\"minHeight\" class=\"tab\">\n\t\t\t\t{{tab.title}}\n\t\t\t\t<div class=\"dropdown\" *ngIf=\"tab.menu\">\n\t\t\t\t\t<span class=\"caret inline-block\" style=\"margin-top: 60%;\" data-toggle=\"dropdown\"></span>\n\t\t\t\t\t<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n\t\t\t\t\t\t<li><a href=\"#\">New Empty Tab</a></li>\n\t\t\t\t\t\t<li><a href=\"#\">One Column Two Rows</a></li>\n\t\t\t\t\t\t<li *ngFor=\"let menuItem of tab.menu\"><a href=\"#\" (click)=\"addTab(menuItem)\">{{menuItem.tabTitle}}</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<i *ngIf=\"!tab.menu\" class=\"fa fa-times close-tab\" (click)=\"close($event, i)\"></i>\n\t\t\t</li>\n\t\t</ul>\n\t\t<div style=\"height: calc(100% - 30px);\"><ng-content></ng-content></div>\n\t",
            styles: ["\n\t\tli.tab {\n\t\t\tposition:\t\t\t\t\t\t\trelative;\n\t\t\tdisplay:\t\t\t\t\t\t\tblock;\n\t\t\tpadding:\t\t\t\t\t\t\t5px 10px;\n\t\t\tline-height:\t\t\t\t\t1.428571429;\n\t\t\tborder-radius:\t\t\t\t3px 3px 0 0;\n\t\t\tborder-bottom-color:\ttransparent;\n\t\t\tcursor:\t\t\t\t\t\t\t\tdefault;\n    \tbackground-color:\t\t\trgba(51,51,51,0.4);\n\t\t\tmargin:\t\t\t\t\t\t\t\t0 2px 2px 0;\n\t\t}\n\t\tli.tab:hover {\n\t\t\tbackground-color: #eeeeee;\n\t\t\tborder-color: #eeeeee #eeeeee #ddd;\n\t\t\tcolor: #666;\n\t\t}\n\t\tli.tab.active {\n\t\t\tbottom-border:\t\t2px solid rgba(51,51,51,0.4);\n\t\t\tpadding-bottom:\t\t7px;\n\t\t\tmargin-bottom:\t\t0;\n\t\t}\n\t\t.close-tab {\n\t\t\tcursor:\t\t\t\t\t\tpointer;\n\t\t}\n\t\t.close-tab:hover {\n\t\t\tcolor:\t\t\t\t\t\tblack;\n\t\t}\n\t"],
            directives: [dropdown_menu_1.Menu]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], Tabs);
    return Tabs;
}());
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.js.map