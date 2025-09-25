import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Reply, Send, Paperclip } from "lucide-react";

interface CommentsTabProps {
  ticketId: string;
}

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  timestamp: string;
  isInternal: boolean;
  replies?: Comment[];
}

export const CommentsTab = ({ ticketId }: CommentsTabProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "I've identified the faulty server hardware in rack B-12. The primary hard drive shows multiple bad sectors and the RAM module is throwing ECC errors. I'll need to schedule a maintenance window to replace both components.",
      author: {
        name: "Sarah Chen",
        role: "Senior IT Technician",
        avatar: ""
      },
      timestamp: "2024-03-15T13:20:00Z",
      isInternal: true,
      replies: [
        {
          id: "1-1",
          content: "Thanks Sarah. I've already ordered the replacement parts - they should arrive tomorrow morning. Let's schedule the maintenance for Saturday at 2 AM to minimize disruption.",
          author: {
            name: "David Wilson",
            role: "IT Manager",
            avatar: ""
          },
          timestamp: "2024-03-15T14:30:00Z",
          isInternal: true
        }
      ]
    },
    {
      id: "2",
      content: "The server has been experiencing intermittent failures since yesterday afternoon. Users are reporting slow response times and occasional timeouts when accessing the customer database.",
      author: {
        name: "Mike Johnson",
        role: "Network Administrator",
        avatar: ""
      },
      timestamp: "2024-03-15T10:35:00Z",
      isInternal: false
    },
    {
      id: "3",
      content: "Hardware replacement completed successfully. Server is back online and all services are functioning normally. Monitoring for the next 24 hours to ensure stability.",
      author: {
        name: "Sarah Chen",
        role: "Senior IT Technician",
        avatar: ""
      },
      timestamp: "2024-03-16T15:45:00Z",
      isInternal: false
    }
  ]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: "Current User",
        role: "Support Agent",
      },
      timestamp: new Date().toISOString(),
      isInternal: isInternal
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    setIsInternal(false);
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent,
      author: {
        name: "Current User",
        role: "Support Agent",
      },
      timestamp: new Date().toISOString(),
      isInternal: isInternal
    };
    
    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));
    
    setReplyContent("");
    setReplyingTo(null);
    setIsInternal(false);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 border-l-2 border-muted pl-4' : ''}`}>
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-semibold text-sm">{comment.author.name}</h4>
            <span className="text-xs text-muted-foreground">{comment.author.role}</span>
            {comment.isInternal && (
              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                Internal
              </Badge>
            )}
          </div>
          
          <time className="text-xs text-muted-foreground mb-3 block">
            {new Date(comment.timestamp).toLocaleString()}
          </time>
          
          <div className="bg-muted/30 rounded-lg p-3 mb-3">
            <p className="text-sm leading-relaxed">{comment.content}</p>
          </div>
          
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1 h-7"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <Reply className="w-3 h-3" />
              Reply
            </Button>
          )}
          
          {replyingTo === comment.id && (
            <div className="mt-4 space-y-3">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isInternal}
                    onChange={(e) => setIsInternal(e.target.checked)}
                    className="rounded"
                  />
                  Internal comment
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Render replies */}
      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* New Comment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Add Comment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="rounded"
                />
                Internal comment
              </label>
              <Button variant="outline" size="sm" className="gap-1">
                <Paperclip className="w-3 h-3" />
                Attach File
              </Button>
            </div>
            <Button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="gap-1"
            >
              <Send className="w-3 h-3" />
              Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Thread */}
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to add one!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};