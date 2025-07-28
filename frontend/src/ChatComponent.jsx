function ChatComponent({ msg }) {
    const isUser = msg.role === 'user';

    const messageAlignment = {
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        margin: '10px 0',
    };

    const messageBubble = {
        padding: '10px 15px',
        borderRadius: '20px',
        maxWidth: '75%',
        backgroundColor: isUser ? '#007AFF' : '#E5E5EA',
        color: isUser ? 'white' : 'black',
    };

    const roleStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    return (
        <div style={messageAlignment}>
            <div style={messageBubble}>
                <div style={roleStyle}>
                    {isUser ? 'You' : 'Assistant'}
                </div>
                <div>{msg.content}</div>
            </div>
        </div>
    );
}

export default ChatComponent;