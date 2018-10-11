const setting = {
    online: true,
    full:false,
};
function _send(da) {
    var i = new XMLHttpRequest();
    i.open("PUT", "https://api.mlab.com/api/1/databases/mmm/collections/Notes?apiKey=pdzTC7g-CT_ZEM5cHdTDcRj4b65cTVyM");
    i.setRequestHeader('Content-type', "application/json");
    var dum = JSON.stringify(da);
    i.send(dum);

}
function _get() {
    var f = new XMLHttpRequest();
    f.open("GET", "https://api.mlab.com/api/1/databases/mmm/collections/Notes?apiKey=pdzTC7g-CT_ZEM5cHdTDcRj4b65cTVyM", );
    f.send();
    f.onreadystatechange = function(e) {
        if (f.status = 200 && f.readyState == 4) {
            var d = JSON.parse(f.responseText);
            AddmultiNotes(d[0].data);
        }
    }
    f.onerror=function name() {
        setting.online =false;
        RestoreLocal();
    }
}
var dba = function(data) {
    this.user = "kunal";
    this.data = data;
}
var obj = function(data) {
    this.data = data;
}
function StopProp(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.id == "lissy")
        e.target.className = e.type == "dragover" ? "WOW" : "";

}
function GhostTost(s) 
{
    var e = document.createElement("div");
    e.innerHTML = s;
    e.classList.add("flyon");
    document.querySelector("body").appendChild(e);
    setTimeout(function()
    {
        e.remove();
    }
    ,1000);

}

function LoadDnd()
{
    if  (window.screen.availWidth>500){    var t=document.createElement("script");
    t.src="https://code.jquery.com/jquery-1.12.4.js";
    var tt=document.createElement("script");
    tt.src="https://code.jquery.com/ui/1.12.1/jquery-ui.js";
   var hd= document.getElementsByTagName("head")[0];
   hd.appendChild(t);
   hd.appendChild(tt);
   setTimeout(function(){ $( "#lissy" ).sortable();},1000);}

}
function Reader(f) {

    var fr = new FileReader();
    fr.onloadend = function(e) {
        AddNotes(e.target.result);
    }
    fr.readAsText(f);
}
function drops() {
    var el = document.getElementById("dropper");

    el.ondragover = function(e) {
        StopProp(e);
    }
    el.ondragleave = function(e) {
        StopProp(e);
    }
    el.ondrop = function(e) {
        StopProp(e);
        var f = e.dataTransfer.files;
        for (let index = 0; index < f.length; index++) {
            Reader(f[index]);

        }
        if (e.dataTransfer.getData("url") != "") {
            AddNotes(e.dataTransfer.getData("url"));
        }

    }

}
function AddNotes(data) {
    var nu = document.querySelector(".item").cloneNode(true);
    if (data == undefined)
        nu.querySelector("textarea").value = "";
    else {
        nu.querySelector("textarea").value = data;
    }
    document.getElementById("lissy").appendChild(nu);
  

}
function AddmultiNotes(o) {
    for (let index = 0; index < o.length; index++) {
        if (o[index].data != "")
            AddNotes(o[index].data);

    }
}
function RestoreLocal() {

    if (setting.online)
        _get();
    else {
        if (localStorage["notes"] != null) {
            var o = JSON.parse(localStorage["notes"]);
            AddmultiNotes(o);
        }
    }

}
function HandleFull(e) {
    var el=e.parentNode.parentElement.parentElement;//e.parentNode.parentElement;
        if(!setting.full)
        {
            openFullscreen(el);
            
            el.querySelector(".lay").style.height="90vh";
            el.querySelector(".text").style.height="90vh";
            el.querySelector(".text").style.width="90vw";
            setting.full=true;
        }
        else
        {
            el.querySelector(".lay").style.height="unset";
            el.querySelector(".text").style.height="unset";
            el.querySelector(".text").style.width="unset";
            _closeFullscreen();
            setting.full=false;
            
            
        }
}
function Fulltoggle() {
    var el=document.documentElement;
    
    if(!setting.full)
        {
            openFullscreen(el);
           
            setting.full=true;
        }
        else
        {
      
            _closeFullscreen();
            setting.full=false;
            
            
        }
}
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function _closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
function Save() {
    var notes = [];
    var t = document.getElementsByClassName("text");
    for (let index = 0; index < t.length; index++) {
        if (t[index].value != "")
            notes.push(new obj(t[index].value));
    }
    var _dba = new dba(notes);
    _send(_dba);
    localStorage["notes"] = JSON.stringify(notes);
    GhostTost("Saved !");
}
const keys = {
    ct: false,
    s: false
}
function Search(v) {

    var t = document.getElementsByClassName("text");
    for (const key in t) {
        if (t[key].value != undefined)
            if (t[key].value.toString().toLowerCase().search(v.toLowerCase()) <= -1) {
                t[key].parentNode.parentElement.parentElement.style.display = "none";

            } else {
                t[key].parentNode.parentElement.parentElement.style.display = "";
            }
    }
}
function OverrideSaveAndPaste() {
    document.onkeydown = function(e) {
        if (keys.ct && e.key == 's') {
            e.preventDefault();
            e.stopPropagation();
            Save();
        }
        if (e.keyCode == 17) {
            keys.ct = true;
        } else
            keys.ct = false;
    }
    document.addEventListener("paste", function(e) {
        if (document.activeElement.type != 'textarea') {
            AddNotes(e.clipboardData.getData("text"))
        }

    })
}
window.onload = function() {
    setting.online = window.navigator.onLine;
    drops();
    OverrideSaveAndPaste();
    RestoreLocal();
    Bindlistners();
    setTimeout(function() {
        document.querySelector(".nav_text").classList.remove("mid");

        document.querySelector(".nav").classList.remove("full");
    }, 2000);
LoadDnd();
}
function Bindlistners() {
    document.getElementById("add").onclick = function() {
        AddNotes(undefined);
       GhostTost("Note Added !");

    }
    document.getElementById("save").onclick = function() {
        Save();

    }
    document.getElementById("search").oninput = function(e) {
        Search(this.value);
    }
    document.getElementById("down").onclick = function() {
       var t=GetAllNotes();
       GhostTost("Downloaded !");
    }
   
}
function GetAllNotes() {
    var t = document.getElementsByClassName("text");
    var txt="";
    for (let index = 0; index < t.length; index++) {
    txt+="Note "+index+"\r\n";
      txt+= t[index].value+"\r\n";
    }
    saveTextAsFile(txt)
}
function saveTextAsFile(text)
{
    var textToWrite = text;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "text_File"+Math.floor(Math.random()*10);

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}  

/*Tools*/
function Copy(e) {
    var txt = e.parentNode.parentElement.querySelector(".text");
    txt.select();
    document.execCommand('copy');
    var d = document.querySelector("#ds");
    d.select();
    GhostTost("Copied !");

}
function Remove(e) {
    if (document.querySelector("#lissy").childElementCount != 1)
   {e.parentNode.parentElement.parentElement.remove();
    GhostTost("Removed !");}
    else
        alert("cannot delete only note");

}
function Clear(e) {

    var txt = e.parentNode.parentElement.querySelector(".text");
    txt.value = "";
    GhostTost("Cleared !");
}
/*Tools*/
