function SearchBoxCode()
{
    this.data = [];
    var selIndex = -1;

    var goAction = function(str)
    {
        $(".results").fadeIn();
        $(".results").html("<p>Search results for <span class=''>"+str+"</span></p><p>...</p>");
        $(".suggestions").hide();
        selIndex = -1;
    }

    var updateSuggestions = function(term)
    {
        $(".suggestions").html("");
        selIndex = -1;

        var list = SearchBoxCode.getSuggestions(term);
        var content = "";
        var index = 0
        for (var i in list)
        {
            content = content + "<p class='suggest_entry' data-index='"+index+"'>" + list[i] + "</p>";
            index++;
        }
        $(".suggestions").html(content);
        $(".suggest_entry").click(function(){
            $(".sfield").val( $(this).text() );
            goAction( $(".sfield").val() );
            $(".suggestions").hide();    
        });
    }

    this.init = function()   //  visible to all
    {
        $(".suggestions").hide();
        $(".results").hide();
        
        $(".sfield").keydown(function(e)
        {
            var key = e.keyCode;
            $(".suggest_entry").css("background-color", "transparent");

            var myval = $(this).val();

            if ( myval.length > 0 )
            {
                if(key === 13)
                {
                    var term = ""+myval;
                    if (selIndex > -1)
                    {
                        $(".suggest_entry").each(function()
                        {
                            if ( parseInt($(this).data("index")) === selIndex)
                            {
                                term = $(this).text();
                                $(".sfield").val(term);
                            }
                        });
                    }
                    goAction( term );
                }
                else if(key === 38 || key === 40) // 38 = up, 40 = down
                {
                    var maxEle = $('.suggest_entry').length;
                    if (key === 38 && selIndex > -1)              selIndex--;
                    else if (key === 40 && selIndex < maxEle -1 ) selIndex++;

                    $(".suggest_entry").each(function() {
                        if ( parseInt($(this).data("index")) === selIndex)
                        {
                            $(this).css("background-color", "rgb(194, 220, 255)");
                        }
                    });
                }
                else {
                    $(".suggestions").show();
                    updateSuggestions( myval );
                }
            }
            else    $(".suggestions").hide();
        });

        $(".sfield").click( function(){
            if ( $(this).val().length > 0 )     $(".suggestions").show();
            else                                $(".suggestions").hide();
        } );

        $(".gofield").click( function(){
            goAction( $(".sfield").val() );
        } );
    }

    this.getSuggestions = function(str)
    {
        var outlist = [];
        str = "" + str.toLowerCase();
        for (var i in this.data)
        {
            var item = "" + this.data[i].toLowerCase();
            if (item.startsWith(str))
            {
                outlist.push(item);
                if (outlist.length >= 10) break;
            }
        }
        return outlist;
    }


}//class

$(document).ready(function()
{
    window.SearchBoxCode = new SearchBoxCode();
    SearchBoxCode.init();
    SearchBoxCode.data = new SampleData().get();

});


