import React, { useState } from 'react';
import { Star, ThumbsUp, User, Mail, MessageSquare } from 'lucide-react';
import * as yup from 'yup';

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  comment: yup.string().required('Review is required').min(10, 'Review must be at least 10 characters'),
  rating: yup.number().required('Rating is required').min(1, 'Rating must be at least 1'),
});

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      rating: 5,
      comment: 'Amazing service! The team was incredibly helpful in planning our trip. Everything was perfect from start to finish.',
      date: '2024-02-15',
      likes: 12,
      isLiked: false,
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      rating: 4,
      comment: 'Great experience overall. The destinations recommended were spectacular. Minor hiccup with scheduling but was quickly resolved.',
      date: '2024-02-10',
      likes: 8,
      isLiked: false,
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleLike = (reviewId: string) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? {
              ...review,
              likes: review.isLiked ? review.likes - 1 : review.likes + 1,
              isLiked: !review.isLiked,
            }
          : review
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    try {
      await schema.validate(formData, { abortEarly: false });
      
      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
        date: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };

      setReviews(prev => [newReview, ...prev]);
      setFormData({ name: '', email: '', rating: 5, comment: '' });
      setSubmitStatus('success');

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
        
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4" />
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4" />
              Your Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Star className="h-4 w-4" />
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= formData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="h-4 w-4" />
              Your Review
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.comment ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Share your experience..."
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">{errors.comment}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Star className="h-5 w-5" />
            Submit Review
          </button>

          {submitStatus === 'success' && (
            <p className="text-center text-green-600">Review submitted successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-center text-red-600">Failed to submit review. Please try again.</p>
          )}
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 rounded-lg p-6 transition-transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleLike(review.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  review.isLiked
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                } hover:bg-blue-100 hover:text-blue-600 transition-colors`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{review.likes}</span>
              </button>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}