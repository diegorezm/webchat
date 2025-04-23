package com.diegorezm.webchat.chat.data.repositories;

import com.diegorezm.webchat.chat.data.dto.ChatMessageDTO;
import com.diegorezm.webchat.chat.domain.ChatMessage;
import com.diegorezm.webchat.chat.domain.ChatMessageRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
public class InMemoryChatMessageRepository implements ChatMessageRepository {
    private List<ChatMessage> messages;

    @Override
    public void save(ChatMessageDTO dto) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        String timestamp = LocalDateTime.now().format(formatter);
        var message = new ChatMessage(dto.author(), dto.content(), timestamp);
        messages.add(message);
    }

    @Override
    public List<ChatMessage> findAll() {
        return messages;
    }
}
