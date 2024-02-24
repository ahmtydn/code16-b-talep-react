import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

import { PostStats } from '@/components/shared';
import { multiFormatDateString } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import CommentSection from './CommentSection';
import {
  useGetCommentsByPostId,
  useSendComment,
} from '@/lib/react-query/queries';
import { toast } from '../ui';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const [showComments, setShowComments] = useState(false);

  if (!post.creator) return;

  useEffect(() => {
    console.log('showComments', showComments);
  }, [showComments]);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Models.Document[]>([]);
  const { mutateAsync: sendComment } = useSendComment();
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isErrorComments,
    refetch,
  } = useGetCommentsByPostId(post.$id);

  if (
    commentsData &&
    'documents' in commentsData &&
    isCommentsLoading === false &&
    isErrorComments === false &&
    commentsData.documents !== comments
  ) {
    setComments(commentsData.documents);
  }

  const handleSubmit = async () => {
    // ACTION = CREATE

    const newComment = await sendComment({
      postId: post.$id,
      comment: comment,
      user: user,
    });

    if (!newComment) {
      toast({
        title: `Yorum gönderme başarısız oldu. Lütfen tekrar deneyin.`,
      });
    }
    setComment('');

    if (newComment) {
      toast({
        title: `Yorumunuz başarıyla gönderildi.`,
      });
    }
    refetch();
  };

  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt='creator'
              className='w-12 lg:h-12 rounded-full'
            />
          </Link>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.creator.name}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular '>
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}
        >
          <img
            src={'/assets/icons/edit.svg'}
            alt='edit'
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className='small-medium lg:base-medium py-5'>
          <p>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className='text-light-3 small-regular'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt='post image'
          className='post-card_img'
        />
      </Link>

      <PostStats
        post={post}
        userId={user.id}
        setShowComments={setShowComments}
        showComments={showComments}
        commentsLength={comments.length}
      />

      <div
        className={`flex flex-col gap-2 ${showComments ? 'block' : 'hidden'}`}
      >
        <CommentSection
          postId={post.$id}
          handleSubmit={handleSubmit}
          setComment={setComment}
          comments={comments}
          imageUrl={user.imageUrl}
          comment={comment}
        />
      </div>
    </div>
  );
};

export default PostCard;
