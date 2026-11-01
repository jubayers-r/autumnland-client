"use client";

import * as React from "react";
import { toast } from "sonner";
import type { CreateReviewInput } from "@/types/review";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ReviewStarRating } from "./ReviewStarRating";

interface WriteReviewDialogProps {
  productId: string;
  productTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateReviewInput) => Promise<void>;
}

export function WriteReviewDialog({
  productId,
  productTitle,
  open,
  onOpenChange,
  onSubmit,
}: WriteReviewDialogProps) {
  const [rating, setRating] = React.useState<number>(5);
  const [author, setAuthor] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<{ author?: string; comment?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { author?: string; comment?: string } = {};
    if (!author.trim()) {
      newErrors.author = "Please enter your name.";
    }
    if (!comment.trim()) {
      newErrors.comment = "Please write your review thoughts.";
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await onSubmit({
        productId,
        author: author.trim(),
        rating,
        comment: comment.trim(),
        isVerified: true,
      });

      toast.success("Review submitted successfully!", {
        description: "Thank you for sharing your feedback with Autumn Land.",
      });

      // Reset form
      setAuthor("");
      setComment("");
      setRating(5);
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full p-6 rounded-[24px]">
        <DialogHeader className="pb-3 border-b border-black/10 dark:border-white/10">
          <DialogTitle className="font-heading font-black text-xl uppercase tracking-tight">
            Write a Review
          </DialogTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Sharing your thoughts on <strong className="text-foreground">{productTitle}</strong>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-3">
          {/* Rating Selection */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs sm:text-sm font-semibold text-foreground">
              Overall Rating *
            </Label>
            <div className="flex items-center gap-3 pt-1">
              <ReviewStarRating
                rating={rating}
                interactive={true}
                onRatingChange={setRating}
                size="lg"
                idPrefix="write-review"
              />
              <span className="text-sm font-medium text-foreground">{rating} out of 5 stars</span>
            </div>
          </div>

          {/* Reviewer Name */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="review-author"
              className="text-xs sm:text-sm font-semibold text-foreground"
            >
              Your Name *
            </Label>
            <Input
              id="review-author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
              }}
              placeholder="e.g. Samantha D."
              className="rounded-xl h-11"
              maxLength={50}
            />
            {errors.author && (
              <p className="text-xs text-destructive font-medium">{errors.author}</p>
            )}
          </div>

          {/* Review Content */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="review-comment"
              className="text-xs sm:text-sm font-semibold text-foreground"
            >
              Your Review *
            </Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (errors.comment) setErrors((prev) => ({ ...prev, comment: undefined }));
              }}
              placeholder="What did you like or dislike? How was the fit, fabric, and quality?"
              rows={4}
              className="rounded-xl resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center text-2xs text-muted-foreground">
              <span>
                {errors.comment ? (
                  <span className="text-destructive font-medium">{errors.comment}</span>
                ) : (
                  "Min. 10 characters"
                )}
              </span>
              <span>{comment.length}/1000</span>
            </div>
          </div>

          <DialogFooter className="pt-2 sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black px-6"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
