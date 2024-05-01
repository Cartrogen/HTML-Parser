import { JSDOM } from "jsdom";

// Extract details from a part element, including title, authority, source, and subparts.
export function extractPartDetails(part) {
  // Helper function to get text content from a selector within an element, safely.
  const textContent = (element, selector) => {
    const selectedElement = element.querySelector(selector);
    return selectedElement ? selectedElement.textContent : null;
  };

  // Return an object containing part details, extracting subpart details recursively.
  return {
    partTitle: textContent(part, "h1"),
    authority: textContent(part, ".authority p")
      ? textContent(part, ".authority p").split(";").map((s) => s.trim())
      : [],
    source: textContent(part, ".source p"),
    subparts: Array.from(part.querySelectorAll(".subpart")).map(
      extractSubpartDetails
    ),
  };
}

// Extracts details from subpart elements, including title and sections.
function extractSubpartDetails(subpart) {
  return {
    subpartTitle: subpart.querySelector("h2").textContent,
    sections: Array.from(subpart.querySelectorAll(".section")).map(
      extractSectionDetails
    ),
  };
}

// Extracts detailed section information including paragraphs and their nesting.
function extractSectionDetails(section) {
  // Get all paragraph-like elements within the section.
  const paragraphs = Array.from(section.querySelectorAll("p, div[id^='p-']"));

  // Determine the level of indentation for an element based on its class name.
  const getLevel = (element) => {
    const className = element.className || '';
    const match = className.match(/indent-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Array to store structured paragraphs with correct nesting.
  const structuredParagraphs = [];
  // Dictionary to keep track of the last paragraph at each level for nesting purposes.
  let lastParagraphsAtLevel = {};

  paragraphs.forEach(p => {
    const level = getLevel(p);
    const paragraph = {
      id: p.id,
      level: level,
      text: p.textContent.trim(),
      subParagraphs: []
    };

    // Determine where to place the paragraph in the structure based on its level.
    if (level > 0) {
      let parentLevel = level - 1;
      let parent = lastParagraphsAtLevel[parentLevel];
      if (parent) {
        parent.subParagraphs.push(paragraph);
      } else {
        structuredParagraphs.push(paragraph);
      }
      lastParagraphsAtLevel[level] = paragraph;
    } else {
      structuredParagraphs.push(paragraph);
      lastParagraphsAtLevel[level] = paragraph;
    }
  });

  return {
    sectionTitle: section.querySelector("h4").textContent,
    paragraphs: structuredParagraphs
  };
}

// Parses HTML content and constructs a JSON representation of the structure.
export function parseHTML(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Construct the top-level structure, extracting subtitle and part details.
  let jsonData = {
    title: document.querySelector(".title h1")?.textContent || "No title found",
    subtitles: Array.from(document.querySelectorAll(".subtitle")).map(
      (subtitle) => ({
        subtitle: subtitle.querySelector("h2").textContent,
        parts: Array.from(subtitle.querySelectorAll(".part")).map(
          extractPartDetails
        ),
      })
    ),
  };

  return jsonData;
}
