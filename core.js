function setupTabsForWiderScreens(){
  var left = 0;
  $('.tab-header').each(function(){
    $(this).css({left : left + "px"});
    left+=$(this).outerWidth() + 2;    
  });
}

var cachedContent={};

function getContent(id, url){
  var deferred = $.Deferred();
  if(cachedContent.hasOwnProperty(id)){
    deferred.resolve(cachedContent[id]);
  }
  else{
    $.get(url).done(function(data){
      cachedContent[id] = data;
      deferred.resolve(data);
    }).fail(function(jq, text, error){
      deferred.resolve("error loading data" + error);
    })
  }
  return deferred.promise();
}

function loadContent(){
  var activeTabSwitcher = $('.tab-switcher:checked');
  if(activeTabSwitcher.length){
    var activeTabTextElem = activeTabSwitcher.siblings('.tab-content').find('.tab-text');
    var tabId = activeTabSwitcher.attr('id');
    getContent(tabId, activeTabTextElem.attr('data-url')).then(function(text){
      activeTabTextElem.html(text);
    })
  }
}

function selectTab(){
  $('.tab-header').removeClass('tab-header-active');
  $('.tab-content').removeClass('tab-content-active');    
  $('.tab-switcher:checked').next().addClass('tab-header-active').next().addClass('tab-content-active');
}  
