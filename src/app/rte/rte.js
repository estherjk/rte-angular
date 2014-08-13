'use strict';

angular.module('rte.module', [
]).
directive('rte', function ($sce) {
  function link (scope, element, attrs, ngModel) {
    var rteContent = element.find('.rte-content');

    var textSelection;
    var textRange;

    scope.formatBlockItems = [
      { idx: 1, opt: 'div', labelPlain: 'Normal', label: $sce.trustAsHtml("Normal") },
      { idx: 2, opt: 'h1', labelPlain: 'Heading 1', label: $sce.trustAsHtml("<h1>Heading 1</h1>") },
      { idx: 3, opt: 'h2', labelPlain: 'Heading 2', label: $sce.trustAsHtml("<h2>Heading 2</h2>") },
      { idx: 4, opt: 'h3', labelPlain: 'Heading 3', label: $sce.trustAsHtml("<h3>Heading 3</h3>") },
      { idx: 5, opt: 'h4', labelPlain: 'Heading 4', label: $sce.trustAsHtml("<h4>Heading 4</h4>") },
      { idx: 6, opt: 'h5', labelPlain: 'Heading 5', label: $sce.trustAsHtml("<h5>Heading 5</h5>") },
      { idx: 7, opt: 'h6', labelPlain: 'Heading 6', label: $sce.trustAsHtml("<h6>Heading 6</h6>") },
      { idx: 8, opt: 'blockquote', labelPlain: 'Quote', label: $sce.trustAsHtml("<blockquote>Quote</blockquote>") },
      { idx: 9, opt: 'pre', labelPlain: 'Code', label: $sce.trustAsHtml("<pre>Code</pre>") }
    ];
    scope.defaultFormatBlockItem = scope.formatBlockItems[0];
    scope.activeFormatBlockItem = scope.defaultFormatBlockItem;

    scope.formatBtns = [
      { idx: 1, cmd: 'bold', icon: $sce.trustAsHtml("<i class='fa fa-bold'></i>") },
      { idx: 2, cmd: 'italic', icon: $sce.trustAsHtml("<i class='fa fa-italic'></i>") },
      { idx: 3, cmd: 'underline', icon: $sce.trustAsHtml("<i class='fa fa-underline'></i>") },
      { idx: 4, cmd: 'strikethrough', icon: $sce.trustAsHtml("<i class='fa fa-strikethrough'></i>") }
    ];

    scope.listBtns = [
      { idx: 1, cmd: 'insertUnorderedList', icon: $sce.trustAsHtml("<i class='fa fa-list-ul'></i>") },
      { idx: 2, cmd: 'insertOrderedList', icon: $sce.trustAsHtml("<i class='fa fa-list-ol'></i>") },
      { idx: 3, cmd: 'outdent', icon: $sce.trustAsHtml("<i class='fa fa-outdent'></i>") },
      { idx: 4, cmd: 'indent', icon: $sce.trustAsHtml("<i class='fa fa-indent'></i>") }
    ];

    scope.alignBtns = [
      { idx: 1, cmd: 'justifyLeft', icon: $sce.trustAsHtml("<i class='fa fa-align-left'></i>") },
      { idx: 2, cmd: 'justifyCenter', icon: $sce.trustAsHtml("<i class='fa fa-align-center'></i>") },
      { idx: 3, cmd: 'justifyRight', icon: $sce.trustAsHtml("<i class='fa fa-align-right'></i>") }
    ];

    scope.linkBtns = [
      { 
        idx: 1, 
        opt: 'link',
        icon: $sce.trustAsHtml("<i class='fa fa-link'></i>"),
        dialogPosition: { top: '0px', left: '0px' },
        isActive: false,
        url: undefined,
        actionStr: 'Insert link',
        action: function () {
          textSelection.addRange(textRange);
          insertHtml("<a href='" + this.url + "' target='_blank'>" + textSelection + "</a>");
          this.isActive = false;
        },
        disable: function () {
          return !checkTextSelected();
        }
      },
      { 
        idx: 2, 
        opt: 'image',
        icon: $sce.trustAsHtml("<i class='fa fa-image'></i>"),
        dialogPosition: { top: '0px', left: '0px' },
        isActive: false,
        url: undefined,
        actionStr: 'Insert image URL',
        action: function () {
          textSelection.addRange(textRange);
          insertHtml("<img src='" + this.url + "'></img>");
          this.isActive = false;
        }
      },
      { 
        idx: 3, 
        opt: 'video',
        icon: $sce.trustAsHtml("<i class='fa fa-youtube-play'></i>"),
        dialogPosition: { top: '0px', left: '0px' },
        isActive: false,
        url: undefined,
        actionStr: 'Insert video URL',
        action: function () {
          textSelection.addRange(textRange);
          insertHtml("<iframe src='" + this.url + "' frameborder='0' allowfullscreen></iframe>");
          this.isActive = false;
        }
      }
    ];
    
    scope.format = function (cmd) {
      document.execCommand(cmd, false, null);
    };

    scope.getFormatState = function (cmd) {
      return document.queryCommandState(cmd);
    };

    scope.setFormatBlockItem = function (item) {
      scope.activeFormatBlockItem = item;
      formatBlock(item.opt);
    };

    scope.showDialog = function (btn) {
      btn.url = '';
      saveTextSelectionRange();
      setActiveItem(btn);
      positionDialog(btn);
    };

    function formatBlock(opt) {
      document.execCommand('formatBlock', false, '<' + opt + '>');
    }

    function getFormatBlockState(opt) {
      return document.queryCommandValue('formatBlock') == opt ? true: false;
    }

    function insertHtml(tag) {
      document.execCommand('insertHTML', false, tag);
    }

    function checkFormatBtnStates() {
      angular.forEach(scope.formatBtns, function (btn) {
        scope.getFormatState(btn.cmd);
      });
    }

    function checkTextSelected() {
      return document.getSelection().toString() ? true: false;
    }

    function saveTextSelectionRange() {
      textSelection = document.getSelection();
      if(textSelection.rangeCount > 0) {
        textRange = textSelection.getRangeAt(0);
      }
    }

    function setActiveItem(item) {
      var isActive = item.isActive;

      angular.forEach(scope.linkBtns, function (i) {
        i.isActive = false;
      });

      item.isActive = !isActive;
    }

    function setActiveFormatBlockItem() {
      angular.forEach(scope.formatBlockItems, function (item) {
        if(getFormatBlockState(item.opt)) {
          scope.activeFormatBlockItem = item;
        }
      });
    }

    function setDefaultFormatBlockOnEmpty() {
      if(ngModel.$viewValue == '') {
        scope.setFormatBlockItem(scope.defaultFormatBlockItem);
      }
    }

    function positionDialog(btn) {
      var btnPosition = $('#btn-' + btn.opt).offset();
      var btnHeight = $('#btn-' + btn.opt).outerHeight();
      var btnWidth = $('#btn-' + btn.opt).outerWidth();
      var dialogContentWidth = $('.rte-dialog').outerWidth();

      btn.dialogPosition = {
        top: (btnPosition.top - $(window).scrollTop() + btnHeight).toString() + 'px',
        left: (btnPosition.left - dialogContentWidth / 2 + btnWidth / 2).toString() + 'px'
      };
    }

    // view --> model
    function setNgModel() {
      var html = rteContent.html();

      // strip out extra <br> tag that is left behind when a contenteditable is cleared
      if(html == '<br>') {
        html = '';
      }

      ngModel.$setViewValue(html);
    }

    // model --> view
    ngModel.$render = function () {
      rteContent.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
    };

    rteContent.on('mouseup keyup', function () {
      scope.$apply(function () {
        setNgModel();
        setDefaultFormatBlockOnEmpty();
        setActiveFormatBlockItem();
        checkFormatBtnStates();
      });
    });
  }

  return {
    restrict: 'E',
    require: 'ngModel',
    templateUrl: '/src/app/rte/rte.html',
    link: link
  };
}).
directive('rteDialog', function () {
  return {
    restrict: 'E',
    scope: {
      position: '=',
      url: '=',
      actionStr: '=',
      action: '&',
      close: '&'
    },
    templateUrl: '/src/app/rte/rte-dialog.html'
  };
});