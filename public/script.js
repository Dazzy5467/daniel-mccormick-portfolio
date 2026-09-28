"use strict";

// These are project summaries for the portfolio, not claims about a current release.
const projects = {
  mykidslunch: {
    category: "Operations & workflow design",
    title: "MyKidsLunch Delivery",
    summary: "A project about making delivery information easier to use without losing the details that make it reliable.",
    sections: [
      ["The problem", "Delivery work brings together plans, routes, quantities, receipts, and exceptions. A useful system needs to make that information understandable while preserving what actually happened."],
      ["What I focused on", ["Organizing source information and bringing spreadsheet-based plans into the workflow.", "Making the difference between ready work and unresolved information visible.", "Improving receipt and document workflows while preserving existing records.", "Reviewing changes and checking the result against the underlying source."]],
      ["How AI fits", "I use AI to help investigate issues, explore implementation options, draft code, and support focused checks. Source records and review still determine what the system can treat as confirmed."],
      ["What this demonstrates", "Business analysis, workflow design, careful handling of data, and an emphasis on verification."]
    ],
    note: "This portfolio shows a recreated interface with fictional stops and counts. It does not expose delivery records, customer details, signatures, or internal access."
  },
  terrapin: {
    category: "Estimating & decision support",
    title: "Terrapin Stucco Estimator",
    summary: "An estimating project focused on turning business requirements into a clear, usable decision-making experience.",
    sections: [
      ["The problem", "An estimating tool has to make inputs and assumptions understandable. It also needs to recognize when a project requires more information or inspection."],
      ["What I focused on", ["Refining the existing estimator around the questions a user needs to answer.", "Keeping pricing assumptions and inspection requirements explicit.", "Reviewing accessibility and testing estimation behavior.", "Checking changes before preparing the next version."]],
      ["How AI fits", "AI assists with implementation, interface refinement, and test development. The business rules and the reviewed source remain the basis for the estimator."],
      ["What this demonstrates", "Translating business requirements into an interactive tool, reviewing the underlying logic, and making the interface easier to understand."]
    ],
    note: "The $5,760 amount and 1,200-square-foot input in this portfolio are fictional illustration values. They are not Terrapin pricing or a quote."
  },
  appealwise: {
    category: "Research & document workflows",
    title: "AppealWise",
    summary: "A project exploring how organized claim information can support a clearer first draft of an insurance appeal or dispute letter.",
    sections: [
      ["The problem", "Correspondence is harder to prepare when the dates, supporting documents, decision being disputed, and requested action are scattered across different records."],
      ["The direction", ["Bring the relevant information into a structured brief.", "Connect draft statements to the records that support them.", "Make missing information and open questions visible.", "Prepare a draft that a person can check, edit, and decide how to use."]],
      ["How AI fits", "The intended role of AI is to assist with organization and drafting while keeping the supporting facts and human review central to the workflow."],
      ["What this demonstrates", "Document design, information organization, clear writing, and thoughtful use of AI in a sensitive workflow."]
    ],
    note: "This is a project overview and interface illustration. No real claim information is shown, and the overview does not claim an appeal outcome or verified current feature set."
  },
  evidence: {
    category: "Research tools",
    title: "Evidence Atlas & Interview Desk",
    summary: "Related project ideas for organizing large collections of records and preparing more focused interview questions.",
    sections: [
      ["The problem", "A large collection of files becomes useful when someone can locate the source, understand the chronology, identify missing information, and frame the next question."],
      ["The direction", ["Create navigable inventories and timelines.", "Retain references to the original source material.", "Separate observations from interpretations and unanswered questions.", "Prepare interview outlines that stay connected to the available records."]],
      ["How AI fits", "AI can help structure information, draft outlines, and suggest questions for review. Source verification and the judgment of the people responsible for the matter remain essential."],
      ["What this demonstrates", "Research organization, documentation, attention to detail, and the ability to make a complex body of information easier to navigate."]
    ],
    note: "Any public demonstration would use entirely fictional identities and records. This portfolio does not include real case materials or make claims about legal outcomes."
  },
  calendar: {
    category: "Connected productivity",
    title: "Connected Calendar",
    summary: "A development project exploring a more useful daily view of schedules, reminders, and follow-up work.",
    sections: [
      ["The problem", "Schedules and next steps can end up spread across different services. A connected experience should help a person understand their day without adding another layer of complexity."],
      ["The direction", ["Bring relevant schedule information into a clear interface.", "Explore reminders and follow-up workflows.", "Design around the devices and services a person already uses.", "Check integrations and real-world behavior as the project develops."]],
      ["How AI fits", "AI supports planning, implementation, and troubleshooting. Each integration still needs its own configuration and verification."],
      ["What this demonstrates", "Product thinking, integration planning, interface design, and iterative development."]
    ],
    note: "This overview describes the project direction. It does not expose calendar events, account information, or claim that every intended integration is complete."
  },
  reeldrop: {
    category: "Product exploration",
    title: "ReelDrop",
    summary: "A movie-ticket resale concept exploring how a consumer marketplace might feel simple and understandable.",
    sections: [
      ["The idea", "Explore the user journey around discovering a listing, understanding the ticket information, and navigating the steps of a possible exchange."],
      ["The direction", ["Make the essential listing information easy to understand.", "Explore the experience from both sides of an exchange.", "Use prototypes to identify confusing steps before expanding the product."]],
      ["How AI fits", "AI assists with concept development, interface experiments, and refining the flow based on review."],
      ["What this demonstrates", "Consumer product thinking, user experience design, and experimentation."]
    ],
    note: "ReelDrop is presented here as a product concept. This portfolio does not accept listings, handle payments, or represent that a ticket marketplace is operating."
  }
};

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("is-open", !expanded);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 701px)").addEventListener("change", event => {
  if (event.matches) closeMenu();
});

const dialog = document.querySelector("#case-dialog");
const caseBody = document.querySelector("#case-body");
let lastTrigger = null;

function openProject(key, trigger) {
  const project = projects[key];
  if (!project) return;
  document.querySelector("#case-category").textContent = project.category;
  document.querySelector("#case-title").textContent = project.title;
  document.querySelector("#case-summary").textContent = project.summary;
  caseBody.replaceChildren();
  for (const [heading, content] of project.sections) {
    const section = document.createElement("section");
    section.className = "case-section";
    const title = document.createElement("h3");
    title.textContent = heading;
    section.append(title);
    if (Array.isArray(content)) {
      const list = document.createElement("ul");
      for (const item of content) {
        const li = document.createElement("li");
        li.textContent = item;
        list.append(li);
      }
      section.append(list);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = content;
      section.append(paragraph);
    }
    caseBody.append(section);
  }
  const note = document.createElement("p");
  note.className = "case-note";
  note.textContent = project.note;
  caseBody.append(note);
  lastTrigger = trigger;
  document.body.classList.add("dialog-open");
  dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector(".dialog-close").focus({ preventScroll: true });
}

document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project, button));
});
function closeProject() {
  document.body.classList.remove("dialog-open");
  dialog.close();
  lastTrigger?.focus({ preventScroll: true });
}
document.querySelectorAll(".dialog-close, .case-done").forEach(button => {
  button.addEventListener("click", closeProject);
});
dialog.addEventListener("cancel", event => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
});
dialog.addEventListener("close", () => {
  if (dialog.open) return;
  document.body.classList.remove("dialog-open");
  lastTrigger?.focus({ preventScroll: true });
});
