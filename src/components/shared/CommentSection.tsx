import React, { SetStateAction } from 'react';
import { Models } from 'appwrite';
import { multiFormatDateString } from '@/lib/utils';

type CommentSectionProps = {
  postId: string;
  handleSubmit: () => void;
  comments: Models.Document[];
  setComment: React.Dispatch<SetStateAction<string>>;
  imageUrl?: string | null;
  comment: string;
};

function CommentSection({
  handleSubmit,
  comments,
  setComment,
  imageUrl,
  comment,
}: CommentSectionProps) {
  return (
    <div className='comments'>
      <hr className='comments-divider' />
      <div className='comments-body'>
        {comments.length < 1 && (
          <p className='text-slate-500 flex relative'>İlk yorumu yapınız...</p>
        )}
        {comments.map((comment) => (
          <div key={comment.$id} className='comment'>
            <img
              src={
                comment.user_image_url ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
            <div className='comment-content'>
              <div className='comment-un-date'>
                <p className='comment-username'>{comment.user_name} </p> 
                <p className='comment-dot'></p>
                <p className='comment-date'>
                  {multiFormatDateString(comment.$createdAt)}
                </p>
              </div>

              <p className='comment-text'>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex gap-4 items-center m-3'>
        <img
          src={imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt='profile'
          className='h-8 w-8 rounded-full'
        />
        <div className='comment-input'>
          <input
            type='text'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder='Yorumunuzu yazın...'
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit();
                }
            }}
          />
        </div>

        <img
          onClick={handleSubmit}
          className='w-8 rounded-full'
          src='/assets/icons/send-comment.svg'
        ></img>
      </div>
    </div>
  );
}

export default CommentSection;
