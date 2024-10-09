/* Type animation */
  (()=>{
     /* Setup and start animation! */
    const typed1 = new Typed('#element', {
        strings: ['My portfolio website','Web developer &amp; graphic designer','You can contact any time ','Check for my exciting projects'],
        typeSpeed: 50,
        loop : true
      });

      [
        { selector: '#devBy', strings: ['This website showcases cutting-edge design and functionality.It is an incredibly exciting project that pushes the boundaries of what is possible online.'] },
        { selector: '#respdev', strings: ['I specialize in responsive design, ensuring that websites adapt seamlessly to any device for an optimal user experience. My approach utilizes flexible layouts and CSS media queries to create dynamic and accessible web pages.'] },
        { selector: '#fstdev', strings: ['Creating my new website has been an exhilarating journey, and seeing it live is incredibly satisfying. I am thrilled to share this dynamic and responsive platform with the world, reflecting my passion and dedication.'] },
        { selector: '#cntdev', strings: ['Explore the content of a website involves navigating through various sections to understand its structure, features, and offerings. Look up for my project to see a comprehensive display of text, images, videos, and interactive elements, showcasing the site purpose and value.'] }
      ].forEach(config => new Typed(config.selector, {
        strings: config.strings,
        typeSpeed: 10,
        loop: false,
        showCursor: false,
        onComplete: () => {
            document.querySelector(config.selector).classList.add('typed');
          }
      }));
    })();

   