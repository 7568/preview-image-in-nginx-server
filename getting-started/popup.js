// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    // document.body.style.backgroundColor = color;
    if($('#preview_img').length>0){
      $('#preview_img').remove()
      $('#draggable').remove()
      $('body pre').show()
    }else{
      window_width = $(window).width()
      $('body pre').hide()
      imgs='<div id="draggable" style="display: none;"></div><div id="preview_img">'
      $('body a:gt(0)').each(function(){
        imgs += "<div style='padding: 1px;max-width:19%;text-align: center;';><img src='"+$(this).attr('href')+"' style='padding: 1px;max-width :"+(window_width/5.8)+"px;';>"+$(this).text()+"</div>";
      })
      imgs +='</div>'
      $('body').append(imgs)
      $( "#preview_img" ).sortable({
        revert: true
      });
      $( "#draggable" ).draggable({
        connectToSortable: "#preview_img",
        helper: "clone",
        revert: "invalid"
      });
      $('#preview_img div').css({'display':'inline-block'})
    }
    
  });
}
