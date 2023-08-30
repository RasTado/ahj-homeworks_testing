import puppeteer from "puppeteer";

describe("Page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
  });

  test("valid input", async () => {
    await page.goto("http://localhost:9000");
    const input = await page.$(".form-control-input");
    await input.type("4556737586899855");
    const button = await page.$(".btn");
    await button.click();
    const validImageDisplayStyle = await page.$eval(".AnswTrue", (el) =>
      getComputedStyle(el).getPropertyValue("display")
    );
    expect(validImageDisplayStyle).toBe("block");
  });

  test("invalid input", async () => {
    await page.goto("http://localhost:9000");
    const input = await page.$(".form-control-input");
    await input.type("4556737586899856");
    const button = await page.$(".btn");
    await button.click();
    const validImageDisplayStyle = await page.$eval(".AnswFalse", (el) =>
      getComputedStyle(el).getPropertyValue("display")
    );
    expect(validImageDisplayStyle).toBe("block");
  });

  test.each([
    ["cardVisa", "4"],
    ["cardMaster", "5"],
    ["cardAE", "34"],
    ["cardD", "60"],
    ["cardJSB", "35"],
    ["cardDC", "30"],
  ])("Testing card image: %s", async (name, number) => {
    await page.goto("http://localhost:9000");
    const input = await page.$(".form-control-input");
    await input.type(number);
    const imageCard = await page.$eval(`.${name}`, (el) =>
      getComputedStyle(el).getPropertyValue("opacity")
    );
    expect(imageCard).toBe("1");
  });

  afterEach(async () => {
    await browser.close();
  });
});
