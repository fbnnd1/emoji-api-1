async function searchEmoji(event) {
    event.preventDefault();

    //clear screen 
    document.querySelector("#user_msg").innerHTML = "";
    //document.querySelector("#emojiInfoContainer").innerHTML = "";
    objEmojiSymbol = document.querySelector("#id_emojiInfoSymbol");
    objEmojiAlias = document.querySelector("#id_emojiInfoAlias");

    objEmojiSymbol.innerHTML = "";
    objEmojiSymbol.innerHTML = "";

    objEmojiSymbol.classList.add("hidden");
    objEmojiAlias.classList.add("hidden");
    document.querySelector("#id_emojiInfoFooter").classList.add("hidden");


    str_emoji = document.querySelector("#txt_emoji").value;


    if (str_emoji == "") {
        //document.querySelector("#user_msg").innerHTML = ""; 
        return;
    }

    str_emoji = str_emoji[0];

    const response = await fetch('api/emoji/' + str_emoji);

    if (response.status != 200) {
        document.querySelector("#user_msg").innerHTML = "Emoji não encontrado.";
        return ;
    }

    const obj_emoji = await response.json();
 
    objEmojiSymbol.innerHTML = obj_emoji.symbol;
    objEmojiAlias.innerHTML  = obj_emoji.alias;

    objEmojiSymbol.classList.remove("hidden");
    objEmojiAlias.classList.remove("hidden");
    document.querySelector("#id_emojiInfoFooter").classList.remove("hidden");

    console.log(obj_emoji);

}