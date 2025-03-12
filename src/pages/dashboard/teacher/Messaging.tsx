
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Paperclip, 
  Send, 
  Plus, 
  Search, 
  MoreVertical, 
  User,
  Users
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Sample contact data
const contacts = [
  { id: '1', name: 'Sarah Johnson', role: 'Student', avatar: null, lastMessage: 'Question about the quiz tomorrow', time: '10:23 AM', unread: true },
  { id: '2', name: 'Principal Williams', role: 'Admin', avatar: null, lastMessage: 'Staff meeting has been rescheduled', time: 'Yesterday', unread: true },
  { id: '3', name: 'Mark Stevens', role: 'Student', avatar: null, lastMessage: 'Can I get an extension on the project?', time: '2 days ago', unread: false },
  { id: '4', name: 'Emily Turner', role: 'Student', avatar: null, lastMessage: 'Thanks for your feedback on my assignment', time: '3 days ago', unread: false },
  { id: '5', name: 'Dr. Roberts', role: 'Teacher', avatar: null, lastMessage: 'Can we discuss the curriculum changes?', time: 'Last week', unread: false },
];

// Sample message data
const messages = [
  { id: '1', sender: 'Sarah Johnson', content: 'Hello Ms. Anderson, I had a question about tomorrow\'s quiz. Will it cover the material from Chapter 5?', time: '10:23 AM', isSelf: false },
  { id: '2', sender: 'You', content: 'Hi Sarah, yes it will cover Chapter 5 sections 5.1 through 5.4. Make sure you review the practice problems we did in class.', time: '10:25 AM', isSelf: true },
  { id: '3', sender: 'Sarah Johnson', content: 'Thank you for clarifying. I\'ll make sure to focus on those sections. Also, will the quiz include the advanced problems from section 5.3?', time: '10:28 AM', isSelf: false },
  { id: '4', sender: 'You', content: 'There will be one advanced problem similar to what we covered in section 5.3, but it will be worth bonus points. Focus on the core concepts first.', time: '10:30 AM', isSelf: true },
  { id: '5', sender: 'Sarah Johnson', content: 'Got it, thank you for the information! I\'ll continue preparing for the quiz.', time: '10:32 AM', isSelf: false },
];

// Get avatar fallback initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const Messaging = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      // In a real app, would add message to the state and send to API
    }
  };

  return (
    <DashboardLayout role="teacher" pageTitle="Messaging">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`px-4 py-3 flex gap-3 border-b cursor-pointer hover:bg-muted/30 transition-colors ${selectedContact.id === contact.id ? 'bg-muted/50' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Avatar>
                    <AvatarImage src={contact.avatar || undefined} />
                    <AvatarFallback className="bg-orange-500">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">{contact.name}</h4>
                      <span className="text-xs text-muted-foreground">{contact.time}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="px-1 py-0 h-4 text-[10px]">
                        {contact.role}
                      </Badge>
                      {contact.unread && (
                        <Badge className="h-2 w-2 rounded-full p-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedContact.avatar || undefined} />
                  <AvatarFallback className="bg-orange-500">
                    {getInitials(selectedContact.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <div className="flex items-center gap-1">
                    {selectedContact.role === 'Student' ? (
                      <User className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <Users className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">{selectedContact.role}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Block Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isSelf 
                        ? 'bg-orange-500 text-white rounded-br-none' 
                        : 'bg-secondary rounded-bl-none'
                    }`}
                  >
                    {!message.isSelf && (
                      <p className="text-xs font-medium mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 text-right ${message.isSelf ? 'text-orange-100' : 'text-muted-foreground'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-3">
              <div className="flex items-end gap-2">
                <Textarea 
                  placeholder="Type your message..." 
                  className="min-h-[60px] flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button 
                    className="rounded-full h-9 w-9 bg-orange-500 hover:bg-orange-600" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messaging;
