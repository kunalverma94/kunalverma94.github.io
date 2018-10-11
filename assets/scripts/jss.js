   window.onload=function ()
    {
            document.getElementById("can").ondragleave=(e)=>
            {
             kill_e(e)
            };
            document.getElementById("can").ondragover=(e)=>
            {
             kill_e(e)
            };
              document.getElementById("can").ondrop=(e)=>
            {
             kill_e(e)
            };

    };

    function kill_e(e) {
        
        e.preventDefault();
        e.stopPropagation();
                 e.target.classList = e.type.search("dragover") > -1 ? "dd" : "";
    }
