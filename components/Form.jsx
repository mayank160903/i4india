
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-center flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} News</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share news with the world, categorized for better reach and visibility.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            YouTube Video URL
          </span>
          <input
            value={post.videoUrl}
            onChange={(e) => setPost({ ...post, videoUrl: e.target.value })}
            type='text'
            placeholder='Enter the YouTube video URL'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Title
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type='text'
            placeholder='Enter the news title'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Description
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Write the news description here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Category
          </span>
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            required
            className='form_input'
          >
            <option value='' disabled>Select a category</option>
            <option value='General'>General</option>
            <option value='Business'>Business</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Sports'>Sports</option>
            <option value='Science'>Science</option>
            <option value='Technology'>Technology</option>
            <option value='Education'>Education</option>
            <option value='History'>History</option>
          </select>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-blue-500 rounded-full text-white'
          >
            {submitting ? (type === 'Create' ? 'Creating' : 'Updating') : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
