//update this with your js_form selector
var form_id_js = "javascript_form";

var data_js = {
    "access_token": "s5uum4fhz6zmjol1u1wbnoap"
};
var sendButton = document.getElementById("js_send");

function js_onSuccess() {
    // remove this to avoid redirect
    // window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    alertify
        .alert("Mensaje enviado", "Gracias por comunicarte con migo.", function () {

        });

    sendButton.value = 'Enviar';
}

function js_onError(error) {
    // remove this to avoid redirect
    //window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
    alertify.error('No pudimos enviar tu mensaje');
    sendButton.value = 'Enviar';
}



function js_send() {

    if (document.querySelector("#" + form_id_js + " [name='text']").value != "") {

        sendButton.value = 'Enviando …';
        sendButton.disabled = true;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                js_onSuccess();
            } else
            if (request.readyState == 4) {
                js_onError(request.response);
            }
        };

        var subject = "Notificación de pagina web";
        var message = document.querySelector("#" + form_id_js + " [name='text']").value;
        data_js['subject'] = subject;
        data_js['text'] = message;
        var params = toParams(data_js);

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send(params);

    } else {
        alertify.error('Escribe un mensaje válido.');
    }



    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});