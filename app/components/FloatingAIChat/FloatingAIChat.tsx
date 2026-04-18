'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './FloatingAIChat.module.css';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const FloatingAIChat = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: t('aiWelcomeMessage', 'Assalamu alaikum! I am HalalHire AI. How can I assist you with your ethical career journey today?'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250); // matches animation duration
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: t('aiPlaceholderResponse', 'I am currently a demo interface, but soon I will be able to help you find Halal-verified jobs, screen candidates, and provide Islamic finance career guidance!'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.floatingWrapper}>
      {isOpen && (
        <div className={`${styles.chatWindow} ${isClosing ? styles.closing : ''}`}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.botIconWrapper}>
                <Sparkles size={20} color="white" />
              </div>
              <div>
                <h3 className={styles.botName}>{t('halalhireAi', 'HalalHire AI')}</h3>
                <div className={styles.botStatus}>
                  <span className={styles.statusDot}></span>
                  {t('online', 'Online')}
                </div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={handleClose} aria-label={t('closeChat', 'Close chat')}>
              <X size={20} />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map(msg => (
              <div key={msg.id} className={`${styles.messageRow} ${styles[msg.sender]}`}>
                <div className={styles.bubble}>{msg.text}</div>
                <span className={styles.time}>{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <textarea
              className={styles.input}
              placeholder={t('askAiAnything', 'Ask AI anything...')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button 
              className={styles.sendBtn} 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              aria-label={t('sendMessage', 'Send message')}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && !isClosing && (
        <button 
          className={styles.floatingBtn} 
          onClick={handleOpen}
          aria-label={t('openAiChat', 'Open AI Assistant')}
        >
          <Bot size={28} />
        </button>
      )}
    </div>
  );
};

export default FloatingAIChat;
