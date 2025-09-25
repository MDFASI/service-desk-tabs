import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Image, 
  Download, 
  Eye, 
  Trash2, 
  Upload,
  File,
  FileCode
} from "lucide-react";

interface AttachmentsTabProps {
  ticketId: string;
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  url?: string;
}

export const AttachmentsTab = ({ ticketId }: AttachmentsTabProps) => {
  // Mock attachments data
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: "1",
      name: "server-diagnostics-report.pdf",
      size: 2048576, // 2MB
      type: "application/pdf",
      uploadedBy: "Mike Johnson",
      uploadedAt: "2024-03-15T10:35:00Z",
      description: "Comprehensive server diagnostic report showing hardware failures and error logs",
    },
    {
      id: "2", 
      name: "error-logs-march-14.txt",
      size: 524288, // 512KB
      type: "text/plain",
      uploadedBy: "Sarah Chen",
      uploadedAt: "2024-03-15T13:25:00Z",
      description: "System error logs from March 14th when issues first appeared",
    },
    {
      id: "3",
      name: "server-room-photo.jpg",
      size: 1536000, // 1.5MB
      type: "image/jpeg", 
      uploadedBy: "Sarah Chen",
      uploadedAt: "2024-03-15T14:10:00Z",
      description: "Photo of the faulty server hardware in rack B-12",
    },
    {
      id: "4",
      name: "replacement-parts-invoice.pdf",
      size: 256000, // 250KB
      type: "application/pdf",
      uploadedBy: "David Wilson",
      uploadedAt: "2024-03-16T09:30:00Z",
      description: "Invoice and receipt for ordered replacement hardware components",
    }
  ]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="w-5 h-5" />;
    } else if (type === 'application/pdf') {
      return <FileText className="w-5 h-5" />;
    } else if (type.startsWith('text/') || type.includes('code')) {
      return <FileCode className="w-5 h-5" />;
    } else {
      return <File className="w-5 h-5" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) {
      return 'bg-green-100 text-green-800';
    } else if (type === 'application/pdf') {
      return 'bg-red-100 text-red-800';
    } else if (type.startsWith('text/')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileUpload = () => {
    // Mock file upload - in real app this would handle file selection and upload
    console.log('File upload triggered');
  };

  const handleDownload = (attachment: Attachment) => {
    // Mock download - in real app this would trigger actual download
    console.log('Download:', attachment.name);
  };

  const handlePreview = (attachment: Attachment) => {
    // Mock preview - in real app this would open file in modal or new tab
    console.log('Preview:', attachment.name);
  };

  const handleDelete = (attachmentId: string) => {
    // Mock delete - in real app this would call delete API
    setAttachments(attachments.filter(a => a.id !== attachmentId));
  };

  const totalSize = attachments.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Drop files here or click to upload</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support for PDF, images, text files, and documents up to 10MB
            </p>
            <Button onClick={handleFileUpload}>
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attachments Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Attachments Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{attachments.length}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{formatFileSize(totalSize)}</div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {new Set(attachments.map(a => a.type)).size}
              </div>
              <div className="text-sm text-muted-foreground">File Types</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attachments List */}
      <Card>
        <CardHeader>
          <CardTitle>Files ({attachments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {attachments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No attachments yet. Upload some files to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  {/* File icon */}
                  <div className="flex-shrink-0 p-2 bg-muted rounded-lg">
                    {getFileIcon(attachment.type)}
                  </div>
                  
                  {/* File details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground truncate">
                          {attachment.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getFileTypeColor(attachment.type)}`}
                          >
                            {attachment.type.split('/')[1]?.toUpperCase() || 'FILE'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(attachment.size)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(attachment)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(attachment)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(attachment.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* File metadata */}
                    <div className="text-xs text-muted-foreground mb-2">
                      Uploaded by <span className="font-medium">{attachment.uploadedBy}</span> on{' '}
                      {new Date(attachment.uploadedAt).toLocaleString()}
                    </div>
                    
                    {/* Description */}
                    {attachment.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {attachment.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};