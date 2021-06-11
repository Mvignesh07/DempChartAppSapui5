var SelectValue="line";
var SelectText ="Line";
var SelectColor="Default_Color";
var selectPop = "Default";
var typeChart = "ProCosRev";
var oVizFrame;
var oAppController;

sap.ui.define([
	"sap/viz/ui5/controls/Popover",
	"sap/ui/core/mvc/Controller",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem"
], function(Popover,Controller,FlattenedDataset,FeedItem) {
	"use strict";

	return sap.ui.controller("DemoApp.Controller.App", 
	{
	onInit : function ()  {
		oAppController=this;
		console.log("On Init");
	},
	onAfterRendering: function(){
		console.log("On After Rendering");	
		oAppController.setProductDetail();
		oAppController.ProCosRev();
		//date and time
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var dateTime = date+' '+time;
     		       	oAppController.getView().byId("date").setText(dateTime);
		//time and date
		//login user
			var firstName = document.getElementById("hidden_firstname").value;
			var lastName = document.getElementById("hidden_lastname").value;
			if (firstName.includes("firstname")) 
				firstName = "";
			 else 
				firstName;
			firstName = "Hello," + firstName + "     " + lastName+" ";
			oAppController.getView().byId("userName").setText(firstName);
		//login user
	},

    setProductDetail : function(){
		var productDetail;
		var url = "/XMII/Illuminator?QueryTemplate=SMT_TRAINING/Vignesh/TASKS/DemoApp/ChartApp/XACUTE_ChartsData&Content-Type=text/json"
		$.ajax({
			url: url,
			type: "POST",
			success: function (data, txt, jqXHR) {
				if(data.Rowsets.Rowset != undefined){
					productDetail = data.Rowsets.Rowset[0].Row;
					var oModel = new sap.ui.model.json.JSONModel(productDetail);
					oAppController.getView().setModel(oModel);   
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
	},

	onChartTypeChanged : function(){
		var SelectChart = oAppController.getView().byId("select").getSelectedKey();
		var chart = oAppController.getView().byId("select")._getSelectedItemText()
		console.log(SelectChart);
		console.log(chart);
		if(SelectText != chart){
			SelectText=chart;
		}
		if(SelectValue != SelectChart){
			SelectValue=SelectChart;
		}
		console.log(SelectValue);
		if(typeChart=="CosRev")
			oAppController.CosRev();
		if(typeChart=="Rev")
			oAppController.Rev();
		if(typeChart=="ProCosRev")
			oAppController.ProCosRev();
		if(typeChart=="ProRev")
			oAppController.ProRev();
		if(typeChart=="ProCos")
			oAppController.ProCos();
		if(typeChart=="Pro")
			oAppController.Pro();
		if(typeChart=="Cos")
			oAppController.Cos();
	},

	onChartColorChanged : function(){
		var SelectKeyColor = oAppController.getView().byId("selectColor").getSelectedKey();
		if(SelectColor != SelectKeyColor){
			SelectColor = SelectKeyColor;
		if(typeChart=="CosRev")
			oAppController.CosRev();
		if(typeChart=="Rev")
			oAppController.Rev();
		if(typeChart=="ProCosRev")
			oAppController.ProCosRev();
		if(typeChart=="ProRev")
			oAppController.ProRev();
		if(typeChart=="ProCos")
			oAppController.ProCos();
		if(typeChart=="Pro")
			oAppController.Pro();
		if(typeChart=="Cos")
			oAppController.Cos();
		}
	},

	onPopoverChanged : function(){
		var Pop = oAppController.getView().byId("selectPopover").getSelectedKey();
		if(Pop != selectPop){
			selectPop = Pop;
		}	
		console.log(selectPop);

		if(typeChart=="CosRev")
			oAppController.CosRev();
		if(typeChart=="Rev")
			oAppController.Rev();
		if(typeChart=="ProCosRev")
			oAppController.ProCosRev();
		if(typeChart=="ProRev")
			oAppController.ProRev();
		if(typeChart=="ProCos")
			oAppController.ProCos();
		if(typeChart=="Pro")
			oAppController.Pro();
		if(typeChart=="Cos")
			oAppController.Cos();	 	
	},

		switchPop : function(selectPop) {          
		var popoverProps = {};
				if (selectPop === "Customer_Popover") {
				 var chartPopover = oAppController.getView().byId("idPopOver");
				console.log("hu"+selectPop);
           				oAppController.chartPopover = new sap.viz.ui5.controls.Popover(popoverProps);
				oAppController.chartPopover.setActionItems([{
					type: 'navigation',
					text: 'Action Item 2',
					children: [{
						text: 'subActionItem 2 - 1',
						press: function() {
							Log.info('Action Item 2 - 1');
						}
					}]
				}, {
					type: 'navigation',
					text: 'Action Item 3',
					children: [{
						text: 'subActionItem 3-1',
						press: function() {
							Log.info('Action Item 3 - 1');
						}
					}, {
						text: 'subActionItem 3-2',
						press: function() {
							Log.info('Action Item 3 - 2');
						}
					}]
				}]);
		    oAppController.chartPopover.connect(oVizFrame.getVizUid());
		}

		if (selectPop === "Default") {
			console.log("hu"+selectPop);
			 var chartPopover = oAppController.getView().byId("idPopOver");
			oAppController.chartPopover = new sap.viz.ui5.controls.Popover(popoverProps);
			oAppController.chartPopover.setActionItems();
			oAppController.chartPopover.connect(oVizFrame.getVizUid());
		}
	},


	Rev : function(){		
		oAppController.chartPopover = oAppController.getView().byId("idPopOver");
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Revenue',
				value: "{Revenue}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);

		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Revenue"]
		}),

		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedCategoryAxis);

	    if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#5899DA'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
	 if(SelectColor === "Semantic_Color"){
	         oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#dc0d0e'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		oAppController.switchPop(selectPop);
	},

	CosRev : function(){
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Revenue',
				value: "{Revenue}"
			},{
				name: 'Cost',
				value: "{Cost}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);
		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Revenue"]
		}),
		feedValueAxis1 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Cost"]
		}),
		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedValueAxis1);
		oVizFrame.addFeed(feedCategoryAxis);
		
	    if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#5899DA','#E8743B'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
		});
	    }
	   if(SelectColor === "Semantic_Color"){
	            oVizFrame.setVizProperties({
			plotArea: {
			    colorPalette: ['#dc0d0e','#f29b1d'],
				dataLabel: {visible:true}
				//dataShape: {primaryAxis: ["bar", "bar"]}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		oAppController.switchPop(selectPop);
	},

	ProCosRev : function(){
		var url = "/XMII/Illuminator?QueryTemplate=SMT_TRAINING/Vignesh/TASKS/DemoApp/ChartApp/XACUTE_ChartsData&Content-Type=text/json"
		var productDetail;
		$.ajax({
			url: url,
			type: "POST",
			async : false,
			success: function (data, txt, jqXHR) {
				if(data.Rowsets.Rowset != undefined){
					productDetail = data.Rowsets.Rowset[0].Row;				
					var oModel = new sap.ui.model.json.JSONModel(productDetail);
					oAppController.getView().setModel(oModel);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Revenue',
				value: "{Revenue}"
			},{
				name: 'Cost',
				value: "{Cost}"
			},{
				name: 'Profit',
				value: "{Profit}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);

		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Revenue"]
		}),
		feedValueAxis1 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Cost"]
		}),
		feedValueAxis2 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Profit"]
		}),

		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedValueAxis1);
		oVizFrame.addFeed(feedValueAxis2);
		oVizFrame.addFeed(feedCategoryAxis);

	        if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#5899DA','#E8743B','#19A979'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
	
	   if(SelectColor === "Semantic_Color"){
	            oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#dc0d0e','#f29b1d','#4cba6b'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		oAppController.switchPop(selectPop);
	},

	Cos : function(){
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Cost',
				value: "{Cost}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);

		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Cost"]
		}),
		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedCategoryAxis);

	    if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#E8743B'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		if(SelectColor === "Semantic_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#f29b1d'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
	  	oAppController.switchPop(selectPop);
	},

	ProCos : function(){
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Cost',
				value: "{Cost}"
			},{
				name: 'Profit',
				value: "{Profit}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);
		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Cost"]
		}),
		feedValueAxis1 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Profit"]
		}),
		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedValueAxis1);
		oVizFrame.addFeed(feedCategoryAxis);

	    if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#E8743B','#19A979'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		if(SelectColor === "Semantic_Color"){
	      	            oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#f29b1d','#4cba6b'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		 oAppController.switchPop(selectPop);
	},

	Pro : function(){
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Profit',
				value: "{Profit}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);

		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Profit"]
		}),

		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedCategoryAxis);

	    if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#19A979'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
	 if(SelectColor === "Semantic_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#4cba6b'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		oAppController.switchPop(selectPop);
	},

	ProRev : function(){
		oAppController.getView().byId("heading1").setText(SelectText+" Chart");
		oVizFrame = oAppController.getView().byId("SelectedChartid1");
		oVizFrame.destroyFeeds();
		oVizFrame.destroyDataset();
		oVizFrame.setVizType(SelectValue);
		var oDataset = new FlattenedDataset({
			dimensions: [{
				name: "ItemCategory",
				value: "{ItemCategory}"
			}],
			measures: [{
				name: 'Revenue',
				value: "{Revenue}"
			},{
				name: 'Profit',
				value: "{Profit}"
			}],
			data: {
				path: "/"
			}
		});
		oVizFrame.setDataset(oDataset);
		var feedValueAxis0 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Revenue"]
		}),
		feedValueAxis1 = new FeedItem({
			"uid": "valueAxis",
			"type": "Measure",
			"values": ["Profit"]
		}),
		feedCategoryAxis = new FeedItem({
			"uid": "categoryAxis",
			"type": "Dimension",
			"values": ["ItemCategory"]
		});
		oVizFrame.addFeed(feedValueAxis0);
		oVizFrame.addFeed(feedValueAxis1);
		oVizFrame.addFeed(feedCategoryAxis);

	    if(SelectColor === "Default_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#5899DA','#19A979'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
	if(SelectColor === "Semantic_Color"){
	        oVizFrame.setVizProperties({
			plotArea: {
				colorPalette: ['#dc0d0e','#4cba6b'],
				dataLabel: {visible:true}
			},
			legend: {
              			title: {visible: false}
             		 },
			title: {
               			visible: true,
                			text: "Measure's for Item Category"
             		 }
			});
		}
		oAppController.switchPop(selectPop);
	},

	onSelectionChange : function(oEvent){
        		var ProSelect  =  oAppController.getView().byId("Profit").getSelected();
		var CosSelect  =  oAppController.getView().byId("Cost").getSelected();
		var RevSelect  =  oAppController.getView().byId("Revenue").getSelected();

		if(ProSelect == true && CosSelect == true && RevSelect == true){
			typeChart = "ProCosRev";
			oAppController.ProCosRev();
		}
		else if(ProSelect == false && CosSelect == true && RevSelect == true){
			typeChart = "CosRev";
			oAppController.CosRev();
		}
		else if(ProSelect == true && CosSelect == false && RevSelect == true){
			typeChart = "ProRev";
			oAppController.ProRev();
		}
		else if(ProSelect == true && CosSelect == true && RevSelect == false){
			typeChart = "ProCos";
			oAppController.ProCos();
		}
		else if(ProSelect == false && CosSelect == false && RevSelect == true){
			typeChart = "Rev";
			oAppController.Rev();
		}
		else if(ProSelect == true && CosSelect == false && RevSelect == false){
			typeChart = "Pro";
			oAppController.Pro();
		}
		else if(ProSelect == false && CosSelect == true && RevSelect == false){
			typeChart = "Cos";
			oAppController.Cos();
		}
	},

           	logout: function () {
           		 var _URL = window.location.href;
            	var urlArray = _URL.split("/");
             	var newURL = "http://" + urlArray[2].concat("/manufacturing/index.jsp");
            	localStorage.setItem("LastLoggedInPage", _URL);
            	sap.m.URLHelper.redirect("/XMII/Illuminator?service=logout&target=" + _URL, false);
         	},

	});	
});
