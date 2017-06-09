var data_slide_data = {
    header: {
        main: "抗菌肽在线预测",
        label: "Antimicrobial Peptide Forecasting Platform"
    },
    body: [{
        header: "功能",
        // options: ["IMP-PUP", "iLM-2L", "CKSAAP_PhoglySite"]
        options: [{
            text: "Predict Antimicrobial Peptides",
            value: "peptide",
            label: "predict antimicrobial peptides and their  functional  types",
            type: "tab"
        },
        {
            text: "IMKNN",
            value: "IMKNN",
            label: "Predicting Subcellular Localization of Gram-negative Bacterial Proteins by IMKNN Algorithm",
            type: "tab"
        }, {
            text: "IMP_PUP",
            value: "IMP_PUP",
            label: "Prediction of pupylation sites in prokaryotic proteins",
            type: "tab"
        }, {
            text: "iLM_2L",
            value: "iLM_2L",
            label: "Prediction of protein lysine methylation sites and their methylation degrees",
            type: "tab"
        }, {
            text: "CKSAAP_PhoglySite",
            value: "CKSAAP_PhoglySite",
            label: "Prediction of protein lysine phosphoglycerylation sites",
            type: "tab"
        }],
        type: "group"
    }, {
        header: "数据",
        options: [{
            text: "搜索",
            value: "search",
            label: "搜索抗菌肽序列",
            type: "tab"
        }, {
            text: "添加",
            value: "add",
            label: "填写您所知的抗菌肽序列丰富数据资源",
            type: "tab"
        }, {
            header: "链接",
            options: [{
                text: "CAMP",
                value: "http://www.camp.bicnirrh.res.in/",
                type: "link"
            },
            {
                text: "APD",
                value: "http://aps.unmc.edu/AP/main.php",
                type: "link"
            }
            ],
            type: "group"
        }],
        type: "group"
    }, {
        header: "说明",
        // options: ["readme", "data", "citation"]
        options: [{
            text: "Introduction ",
            value: "Introduction.html",
            type: "link"
        }, {
            text: "Citation",
            value: "Citation.html",
            type: "link"
        }, {
            text: "About us",
            value: "About.html",
            type: "link"
        }, {
            text: "Contact us",
            value: "Contact.html",
            type: "link"
        }],
        type: "group"
    }
    ],
    footer: [""]
};
var data_slide_event = {
    tabEvent: function (dom) {
        showTab($(dom).data("value"), dom);
    },
    show: function () {
        $("#slideContainer").animate();
        $("#slideContainer").removeClass("col-md-1", 500);
        $("#tabContainer").removeClass("col-md-11", 500);
        // $("#slideContainer").addClass("col-md-3", 300);
        // $("#tabContainer").addClass("col-md-9", 300);
    },
    hide: function () {
        // $("#slideContainer").removeClass("col-md-3");
        // $("#tabContainer").removeClass("col-md-9");
        $("#slideContainer").addClass("col-md-1", 500);
        $("#tabContainer").addClass("col-md-11", 500);
    }
}