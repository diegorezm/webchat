package com.diegorezm.webchat.chat.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @GetMapping
    public String index() {
        return "index";
    }
}
