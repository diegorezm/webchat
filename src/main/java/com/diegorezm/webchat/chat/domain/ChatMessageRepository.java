package com.diegorezm.webchat.chat.domain;

import com.diegorezm.webchat.chat.data.dto.ChatMessageDTO;

import java.util.List;

public interface ChatMessageRepository {
    ChatMessage save(ChatMessageDTO dto);

    List<ChatMessage> findAll();
}
