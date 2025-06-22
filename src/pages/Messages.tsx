
import { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Send,
  MoreVertical,
  Paperclip,
  Phone,
  Video,
  Image
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: "me" | "them";
  read: boolean;
}

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(conversationHistory);
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      timestamp: "Just now",
      sender: "me",
      read: false,
    };
    
    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));
    
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="grid h-full gap-4 md:grid-cols-[300px_1fr]">
        {/* Contacts Sidebar */}
        <Card className="flex flex-col overflow-hidden">
          <div className="p-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg p-2",
                    selectedContact?.id === contact.id 
                      ? "bg-primary/10" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <img src={contact.avatar} alt={contact.name} />
                    </Avatar>
                    {contact.online && (
                      <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unreadCount > 0 && (
                    <Badge className="h-5 min-w-5 px-1 flex items-center justify-center">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Conversation Area */}
        {selectedContact ? (
          <Card className="flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={selectedContact.avatar} alt={selectedContact.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Clear conversation</DropdownMenuItem>
                    <DropdownMenuItem>Block contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages[selectedContact.id]?.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex max-w-[70%] flex-col",
                      message.sender === "me"
                        ? "ml-auto items-end"
                        : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2",
                        message.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Select a contact</h3>
              <p className="text-sm text-muted-foreground">
                Choose a contact to start chatting
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Mock contacts data
const contacts: Contact[] = [
  {
    id: "contact1",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/300?img=11",
    lastMessage: "The shipment is on schedule for delivery.",
    timestamp: "10:23 AM",
    unreadCount: 2,
    online: true
  },
  {
    id: "contact2",
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/300?img=5",
    lastMessage: "I'll be at the pickup location by noon.",
    timestamp: "Yesterday",
    unreadCount: 0,
    online: false
  },
  {
    id: "contact3",
    name: "Robert Davis",
    avatar: "https://i.pravatar.cc/300?img=12",
    lastMessage: "Can we reschedule the delivery?",
    timestamp: "Wed",
    unreadCount: 1,
    online: true
  },
  {
    id: "contact4",
    name: "James Smith",
    avatar: "https://i.pravatar.cc/300?img=15",
    lastMessage: "The truck is loaded and ready to go.",
    timestamp: "Mon",
    unreadCount: 0,
    online: false
  },
  {
    id: "contact5",
    name: "Emma Brown",
    avatar: "https://i.pravatar.cc/300?img=20",
    lastMessage: "Thanks for the update!",
    timestamp: "Apr 03",
    unreadCount: 0,
    online: true
  }
];

// Mock conversation history
const conversationHistory: Record<string, Message[]> = {
  "contact1": [
    {
      id: "msg1",
      text: "Hi, I wanted to check on the status of my shipment.",
      timestamp: "10:10 AM",
      sender: "them",
      read: true
    },
    {
      id: "msg2",
      text: "Hello! Your shipment is currently in transit. It left our Phoenix distribution center this morning.",
      timestamp: "10:12 AM",
      sender: "me",
      read: true
    },
    {
      id: "msg3",
      text: "Great! When do you expect it to arrive?",
      timestamp: "10:15 AM",
      sender: "them",
      read: true
    },
    {
      id: "msg4",
      text: "The shipment is on schedule for delivery tomorrow between 2-4 PM.",
      timestamp: "10:23 AM",
      sender: "me",
      read: false
    }
  ],
  "contact2": [
    {
      id: "msg5",
      text: "I'm scheduling a pickup for tomorrow. Is that possible?",
      timestamp: "Yesterday",
      sender: "them",
      read: true
    },
    {
      id: "msg6",
      text: "Yes, we can arrange that. What time works for you?",
      timestamp: "Yesterday",
      sender: "me",
      read: true
    },
    {
      id: "msg7",
      text: "I'll be at the pickup location by noon. Does that work?",
      timestamp: "Yesterday",
      sender: "them",
      read: true
    }
  ],
  "contact3": [
    {
      id: "msg8",
      text: "There's an issue with the delivery address.",
      timestamp: "Wednesday",
      sender: "them",
      read: true
    },
    {
      id: "msg9",
      text: "What's the problem? Do we need to update it?",
      timestamp: "Wednesday",
      sender: "me",
      read: true
    },
    {
      id: "msg10",
      text: "Can we reschedule the delivery? The warehouse will be closed tomorrow.",
      timestamp: "Wednesday",
      sender: "them",
      read: false
    }
  ]
};

export default Messages;
