let input_message = $('#input-message')
let message_body = $('.msg_card_body')
let send_message_form = $('#send-message-form')
const USER_ID = $('#logged-in-user').val()

let loc = window.location
let wsStart = 'ws://'

if (loc.protocol === 'https') {
    wsStart = 'wss://'
}
let thread_id = get_active_thread_id();  // Get the active thread ID from your UI
let endpoint = wsStart + loc.host + '/ws/chat/' + thread_id + '/';  // WebSocket URL for the thread

var socket = new WebSocket(endpoint)

socket.onopen = function (e) {
    console.log('WebSocket connection opened', e)

    send_message_form.on('submit', function (e) {
        e.preventDefault()
        let message = input_message.val()
        let send_to = get_active_other_user_id()

        // Send message to the server
        let data = {
            'message': message,
            'sent_by': USER_ID,
            'send_to': send_to,
            'thread_id': thread_id
        }
        data = JSON.stringify(data)
        socket.send(data)  // Send the data over the WebSocket
        $(this)[0].reset()
    })
}

socket.onmessage = function (e) {
    console.log('Message received:', e)
    let data = JSON.parse(e.data)
    let message = data['message']
    let sent_by_id = data['sent_by']
    let thread_id = data['thread_id']
    newMessage(message, sent_by_id, thread_id)
}

socket.onerror = function (e) {
    console.log('WebSocket error:', e)
}

socket.onclose = function (e) {
    console.log('WebSocket closed', e)
}

function newMessage(message, sent_by_id, thread_id) {
    if ($.trim(message) === '') {
        return false;
    }
    let message_element;
    let chat_id = 'chat_' + thread_id
    if (sent_by_id == USER_ID) {
        message_element = `
            <div class="d-flex mb-4 replied">
                <div class="msg_cotainer_send">
                    ${message}
                    <span class="msg_time_send">8:55 AM, Today</span>
                </div>
                <div class="img_cont_msg">
                    <img src="https://example.com/your-avatar.jpg" alt="Logo">
                </div>
            </div>
        `
    } else {
        message_element = `
            <div class="d-flex mb-4 received">
                <div class="img_cont_msg">
                    <img src="https://example.com/other-user-avatar.jpg" class="rounded-circle user_img_msg">
                </div>
                <div class="msg_cotainer">
                    ${message}
                    <span class="msg_time">8:40 AM, Today</span>
                </div>
            </div>
        `
    }

    let message_body = $('.messages-wrapper[chat-id="' + chat_id + '"] .msg_card_body')
    message_body.append($(message_element))
    message_body.animate({ scrollTop: $(document).height() }, 100)
    input_message.val(null)
}
