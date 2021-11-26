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
      $('body pre').show()
    }else{
      $('body pre').hide()
      imgs='<div id="preview_img">'
      $('body a:gt(0)').each(function(){
        imgs += "<div style='padding: 1px;width : 360px;float: left;text-align: center;';><img src='"+$(this).attr('href')+"' style='padding: 1px;width :360px;';>"+$(this).text()+"</div>";
      })
      imgs +='</div>'
      $('body').append(imgs)
      }
    
  });
}
