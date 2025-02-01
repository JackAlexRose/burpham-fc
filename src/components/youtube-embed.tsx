export function YoutubeEmbed() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src="https://www.youtube.com/embed?listType=playlist&list=UUHbJ031WLO_qEwFDmIy1IDg"
        title="Latest Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute left-0 top-0 h-full w-full border-0"
      />
    </div>
  );
}
