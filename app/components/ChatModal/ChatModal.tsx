'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatModal.module.css';
import Image from 'next/image';
import { X, ArrowLeft, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockChats = [
  {
    id: '1',
    name: 'Ahmed Al-Farsi',
    avatar: '/b1.png',
    status: 'online',
    lastMessage: 'Assalamu alaikum, is the position still open?',
    time: '10:30 AM',
    unread: 2,
    messages: [
      { id: 'm1', senderId: '1', text: 'Assalamu alaikum!', time: '10:28 AM' },
      { id: 'm2', senderId: '1', text: 'I saw your job posting for the Backend Developer role.', time: '10:29 AM' },
      { id: 'm3', senderId: '1', text: 'Is the position still open?', time: '10:30 AM' },
    ]
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    avatar: '/b2.png',
    status: 'offline',
    lastMessage: 'Thank you for the interview opportunity.',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hi Fatima, we would love to schedule an interview with you this Thursday.', time: 'Wed 2:00 PM' },
      { id: 'm2', senderId: '2', text: 'That sounds great. What time works best for you?', time: 'Wed 2:15 PM' },
      { id: 'm3', senderId: 'me', text: 'How about 10:00 AM AST?', time: 'Wed 2:30 PM' },
      { id: 'm4', senderId: '2', text: 'Perfect. Thank you for the interview opportunity.', time: 'Yesterday' },
    ]
  },
  {
    id: '3',
    name: 'TechSalat Solutions',
    avatar: '/b3.png',
    status: 'online',
    lastMessage: 'We have sent you the offer letter.',
    time: 'Monday',
    unread: 1,
    messages: [
      { id: 'm1', senderId: '3', text: 'Congratulations! We would like to offer you the position.', time: 'Monday' },
      { id: 'm2', senderId: '3', text: 'We have sent you the offer letter.', time: 'Monday' },
    ]
  }
];

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState(mockChats);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages]);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveChatId(null);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeChatId) return;

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: inputValue,
          time: t('justNow', 'Just now'),
          messages: [
            ...chat.messages,
            {
              id: Date.now().toString(),
              senderId: 'me',
              text: inputValue,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return chat;
    }));
    
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatClick = (chatId: string) => {
    setActiveChatId(chatId);
    // Mark as read
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unread: 0 } : c));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.chatModal} 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            {activeChatId && (
              <button 
                className={styles.backBtn} 
                onClick={() => setActiveChatId(null)}
                aria-label={t('backToList', 'Back to list')}
              >
                <ArrowLeft size={20} />
              </button>
            )}
            
            {!activeChatId ? (
              <div>
                <h2 className={styles.modalTitle}>{t('messages', 'Messages')}</h2>
                <p className={styles.modalSubtitle}>{t('yourRecentConversations', 'Your recent conversations')}</p>
              </div>
            ) : (
              <div className={styles.chatTargetInfo}>
                <div className={styles.chatAvatar}>
                  <Image src={activeChat?.avatar || '/default-avatar.png'} alt={activeChat?.name || ''} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 className={styles.chatTargetName}>{activeChat?.name}</h3>
                  <div className={styles.chatTargetStatus}>
                    {activeChat?.status === 'online' && <span className={styles.statusDot}></span>}
                    {activeChat?.status === 'online' ? t('online', 'Online') : t('offline', 'Offline')}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            className={styles.modalCloseBtn} 
            onClick={onClose}
            aria-label={t('closeChat', 'Close chat')}
          >
            <X size={18} />
          </button>
        </div>

        {!activeChatId ? (
          /* List View */
          <div className={styles.chatList}>
            {chats.map(chat => (
              <div 
                key={chat.id} 
                className={styles.chatItem}
                onClick={() => handleChatClick(chat.id)}
              >
                <div className={styles.itemAvatar}>
                  <Image src={chat.avatar} alt={chat.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemName}>{chat.name}</h3>
                    <span className={styles.itemTime}>{chat.time}</span>
                  </div>
                  <div className={styles.itemMessageRow}>
                    <p className={styles.itemLastMessage} style={{ fontWeight: chat.unread > 0 ? 600 : 400, color: chat.unread > 0 ? '#193f35' : '#64748b' }}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <div className={styles.unreadBadge}>{chat.unread}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Conversation View */
          <div className={styles.conversationArea}>
            <div className={styles.messagesList}>
              {activeChat?.messages.map((msg) => {
                const isMe = msg.senderId === 'me';
                return (
                  <div key={msg.id} className={`${styles.messageRow} ${isMe ? styles.sent : styles.received}`}>
                    <div className={styles.messageBubble}>
                      {msg.text}
                    </div>
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            
            <div className={styles.inputArea}>
              <textarea
                className={styles.messageInput}
                placeholder={t('typeYourMessage', 'Type your message...')}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
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
      </div>
    </div>
  );
};

export default ChatModal;
