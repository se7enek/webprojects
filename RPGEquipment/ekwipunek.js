//<![CDATA[
$(function(){
"use strict";

jQuery.fn.extend({
    parentToAnimate: function(newParent, duration) {
        duration = duration || 'slow';
        
        var $element = $(this);
        //console.log($element);
        if($element.length > 0)
        {
            
            newParent = $(newParent); // Allow passing in either a JQuery object or selector
            var oldOffset = $element.offset();
            $(this).appendTo(newParent);
            var newOffset = $element.offset();
            
            
            var temp = $element.clone().appendTo('body');
            
            temp.css({
                'position': 'absolute',
                'left': oldOffset.left,
                'top': oldOffset.top,
                'zIndex': 1000
            });
            
            $element.hide();
                
            temp.animate({
                'top': newOffset.top,
                'left': newOffset.left
            }, duration, function() {
                $element.show();
                temp.remove();
            });
            
            //console.log("parentTo Animate done");
        }
    }
});

$('.inventory-cell-locked').click(function(){
  alert('Juz dzisiaj kup dodatkowe sloty!');
});

///////////////////////////////////////

refreshSortableInventoryList();
function refreshSortableInventoryList()
{
    $('.inventory-cell').sortable({
        connectWith: '.inventory-cell',
        placeholder: 'inventory-item-sortable-placeholder',
        receive: function( event, ui ) {
            var attrWhitelist = $(this).closest('.inventory-table').attr('data-item-filter-whitelist');
            var attrBlackList = $(this).closest('.inventory-table').attr('data-item-filter-blacklist');
            var itemFilterWhitelistArray = attrWhitelist ? attrWhitelist.split(/\s+/) : [];
            var itemFilterBlacklistArray = attrBlackList ? attrBlackList.split(/\s+/) : [];
            //console.log(itemFilterWhitelistArray);
            //console.log(itemFilterBlacklistArray);  
            
            var attrTypeList = $(ui.item).attr('data-item-type');
            var itemTypeListArray = attrTypeList ? attrTypeList.split(/\s+/) : [];
            //console.log(itemTypeListArray);
            
            var canMoveIntoSlot = verifyWithWhiteBlackLists(itemTypeListArray, itemFilterWhitelistArray, itemFilterBlacklistArray)
            
            if(!canMoveIntoSlot)
            {
                console.log("Can't move to this slot");
                //$(ui.sender).sortable('cancel');
                $(ui.item).parentToAnimate($(ui.sender), 200);
            }
            else                
            {
            
                // Swap places of items if dragging on top of another
                // Add the items in this list to the list the new item was from
                $(this).children().not(ui.item).parentToAnimate($(ui.sender), 200);
                
                // $(this) is the list the item is being moved into
                // $(ui.sender) is the list the item came from
                // Don't forget the move swap items as well
                
                // $(this).attr('data-slot-position-x');
                // $(this).attr('data-slot-position-y');
                // $(ui.sender).attr('data-slot-position-x');
                // $(ui.sender).attr('data-slot-position-y');
                //console.log("Moving to: (" + $(this).attr('data-slot-position-x') + ", " + $(this).attr('data-slot-position-y') + ") - From: (" + $(ui.sender).attr('data-slot-position-x') + ", " + $(ui.sender).attr('data-slot-position-y') + ")");
            }
        }
    }).each(function() {
        // Setup some nice attributes for everything
        // Makes it easier to update the backend
        $(this).attr('data-slot-position-x', $(this).prevAll('.inventory-cell').length);
        $(this).attr('data-slot-position-y', $(this).closest('.inventory-row').prevAll('.inventory-row').length);
    }).disableSelection();
}

function verifyWithWhiteBlackLists(itemList, whiteList, blackList)
{
    // itemList should contain tags
    // whiteList and blackList can contain tags and tag queries
    
    // If we have a matching tags to some tag query in the whiteList but not in the blackList, then return true
    // Else return false
    
    
    console.group("Lists");
    console.log(itemList);
    console.log(whiteList);
    console.log(blackList);
    console.groupEnd();

    // If white and black lists are empty, return true
    // Save the calculations, no filtering
    if(whiteList.length == 0 && blackList.length == 0)
        return true;
    

    
    // Check if the itemList has an item in the blackList
    var inBlackList = false;
    $.each(blackList, function(index, value) {
        var itemBlack = value;
        var itemBlackAndArray = itemBlack.split(/\+/);
        console.log(itemBlackAndArray);
        
        var andedResult = true;
        for(var i = 0; i < itemBlackAndArray.length; i++)
        {
            if(blackList.length > 0 && $.inArray(itemBlackAndArray[i], itemList) !== -1)
            {
                andedResult = andedResult && true;
            }
            else
            {
                andedResult = andedResult && false;
            }
        }
        
        if(andedResult)
            inBlackList = true;
    });
    
    inBlackList = blackList.length > 0 ? inBlackList : false;
    
    
    // Check if the itemList has an item in the whiteList
    var inWhiteList = false;
    $.each(whiteList, function(index, value) {
        var itemWhite = value;
        var itemWhiteAndArray = itemWhite.split(/\+/);
        //console.log(itemWhiteAndArray);
        
        var andedResult = true;
        for(var i = 0; i < itemWhiteAndArray.length; i++)
        {
            if(whiteList.length > 0 && $.inArray(itemWhiteAndArray[i], itemList) !== -1)
            {
                andedResult = andedResult && true;
            }
            else
            {
                andedResult = andedResult && false;
            }
        }
        //console.log("andedResult: " + andedResult);
        
        if(andedResult)
            inWhiteList = true;
       
    });
    
    inWhiteList = whiteList.length > 0 ? inWhiteList : false;
    
    
    console.log("inWhite: " + inWhiteList + " - inBlack: " + inBlackList);
    
    if((whiteList.length == 0 || inWhiteList) && !inBlackList)
        return true;
    
    return false;
}

});//]]> 
