// server side version

import axios from "axios";
import Image from "next/image";

interface IBlogDetailPageProps {
  params: Promise<{ title: string }>;
}

const getDetail = async (title: string) => {
  try {
    const result = await axios.get(
      `https://upwardskin-us.backendless.app/api/data/blogs?where=%60title%60%20%3D%20'${title}'&loadRelations=account`
    );
    console.log(result.data); // muncul di terminal vscode / server, bukan di inspect terminal web browser

    return result.data[0];
  } catch (error) {
    console.log(error);
  }
};

async function BlogDetailPage(props: IBlogDetailPageProps) {
  const params = await props.params;
  const detail = await getDetail(params.title);

  console.log(detail);
  return (
    <section className="mt-10 flex flex-col gap-2 px-50 py-10">
      <Image // using image from next/image, so the image link automaticly converted to webp and compresed
        src={detail.thumbnail}
        width={1200}
        height={800}
        alt="thumbnail"
      />
      <div className="flex gap-1 text-neutral-500">
        <h2>{new Date(detail?.created).toLocaleDateString("id-ID")}</h2>
        <p>•</p>
        <h2>
          {/* show username on the blog detail */}
          {`Written by: ${detail.account.username}`}
        </h2>
      </div>
      <h1 className="text-3xl font-bold">{detail.title}</h1>
      <p>{detail.content}</p>
    </section>
  );
}

export default BlogDetailPage;
