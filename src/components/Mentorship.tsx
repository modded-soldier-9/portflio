const Mentorship = () => {
  return (
    <section id="mentorship" className="py-20">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Mentorship &amp; Speaking</h2>

        <div className="max-w-3xl space-y-4">
          <p className="text-fg-muted leading-relaxed">
            Mentored student teams at the AFRITECH innovation competition, guiding three groups to
            top-3 finishes while developing cashless campus payment solutions. Delivered talks on
            cybersecurity careers and technical innovation.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Mentorship', 'Public Speaking', 'Innovation', 'Fintech', 'Education'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-bg-raised border border-border text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
