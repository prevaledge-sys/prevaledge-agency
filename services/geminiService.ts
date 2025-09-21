
import { GoogleGenAI, Type } from "@google/genai";
import type { HoloscanResult, AdCopyResult, BlogIdea, KeywordCluster, SocialPostResult } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function* generateDigitalStrategy(prompt: string): AsyncGenerator<string> {
    const model = 'gemini-2.5-flash';
    const fullPrompt = `You are a world-class digital marketing strategist. Generate a comprehensive digital strategy for the following business idea. Structure the response in markdown format with clear headings for each section (e.g., ### Target Audience, ### SEO Strategy, ### Content Marketing, ### Social Media, etc.). Business Idea: "${prompt}"`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: fullPrompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

export const analyzeWebsitePresence = async (url: string): Promise<HoloscanResult> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Perform a high-level analysis of the website at ${url}. Evaluate it based on modern standards for SEO, User Experience (UX), Performance, and Security. Provide a score from 0-100 for each category and an overall score. For each category, give brief feedback and one key recommendation. Also provide a concise executive summary. Return the result in JSON format.`;

    const categorySchema = {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.INTEGER, description: "A score from 0-100." },
            feedback: { type: Type.STRING, description: "Brief feedback on the category." },
            recommendations: { type: Type.STRING, description: "One key recommendation for improvement." },
        },
        required: ["score", "feedback", "recommendations"],
    };

    const holoscanSchema = {
        type: Type.OBJECT,
        properties: {
            overallScore: { type: Type.INTEGER, description: "The overall score from 0-100, an average of the categories." },
            executiveSummary: { type: Type.STRING, description: "A concise, one or two-sentence summary of the site's digital presence." },
            seo: { ...categorySchema, description: "Analysis of Search Engine Optimization." },
            ux: { ...categorySchema, description: "Analysis of User Experience and Design." },
            performance: { ...categorySchema, description: "Analysis of website speed and Core Web Vitals." },
            security: { ...categorySchema, description: "Analysis of security protocols like HTTPS and other best practices." },
        },
        required: ["overallScore", "executiveSummary", "seo", "ux", "performance", "security"],
    };

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: holoscanSchema,
        }
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as HoloscanResult;
};

export const generateAdCopy = async (productName: string, targetAudience: string, keyFeatures: string, tone: string): Promise<AdCopyResult> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate ad copy for a product.
      - Product Name: ${productName}
      - Target Audience: ${targetAudience}
      - Key Features: ${keyFeatures}
      - Tone: ${tone}
      Provide 3 short, punchy headlines (under 40 characters) and 2 compelling descriptions (under 90 characters).`;
      
    const adCopySchema = {
        type: Type.OBJECT,
        properties: {
            headlines: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "An array of 3 headline strings." 
            },
            descriptions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "An array of 2 description strings." 
            },
        },
        required: ["headlines", "descriptions"],
    };
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: adCopySchema,
        }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as AdCopyResult;
};

export const generateBlogIdeas = async (topic: string): Promise<BlogIdea[]> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate 5 creative, SEO-friendly blog post ideas for the topic: "${topic}". For each idea, provide a compelling title, a short "hook" to draw the reader in, and a list of 3-5 relevant keywords.`;

    const blogIdeaSchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "The blog post title." },
            hook: { type: Type.STRING, description: "A one-sentence hook to grab attention." },
            keywords: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "An array of 3-5 relevant keywords."
            },
        },
        required: ["title", "hook", "keywords"],
    };
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: blogIdeaSchema
            },
        }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as BlogIdea[];
};

export const generateKeywordClusters = async (seedKeyword: string): Promise<KeywordCluster[]> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate 5 relevant keyword clusters based on the seed keyword: "${seedKeyword}". Each cluster should have a descriptive title and a list of 5-8 related long-tail keywords. This is for building topical authority for an SEO content strategy.`;

    const keywordClusterSchema = {
        type: Type.OBJECT,
        properties: {
            clusterTitle: { type: Type.STRING, description: "The title of the keyword cluster." },
            keywords: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "A list of 5-8 related keywords."
            },
        },
        required: ["clusterTitle", "keywords"],
    };

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: keywordClusterSchema
            },
        }
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as KeywordCluster[];
};

export const generateSocialPosts = async (topic: string, platform: string, goal: string, tone: string): Promise<SocialPostResult[]> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate 2 variations of a social media post.
      - Topic/URL/Content: ${topic}
      - Platform: ${platform}
      - Goal: ${goal}
      - Tone: ${tone}
      For each variation, provide the post copy, a list of 3-5 relevant hashtags, and a creative suggestion for a visual (image or video).`;

    const socialPostSchema = {
        type: Type.OBJECT,
        properties: {
            post: { type: Type.STRING, description: "The text content of the social media post." },
            hashtags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "A list of 3-5 relevant hashtags (without the #)."
            },
            visualSuggestion: { type: Type.STRING, description: "A creative suggestion for an accompanying visual." },
        },
        required: ["post", "hashtags", "visualSuggestion"],
    };

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: socialPostSchema
            },
        }
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as SocialPostResult[];
};

// --- Admin Content Assistance ---

export const generateBlogPostDraft = async (title: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `You are a professional blog writer and SEO expert. Write a comprehensive, well-structured blog post in markdown format about the following title: "${title}". The post should have a compelling introduction, several detailed sections with markdown headings (e.g., ### Section Title), and a strong concluding paragraph. Ensure the content is engaging, informative, and ready to be published.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

export const improveText = async (text: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `You are an expert editor. Review the following text and improve its grammar, clarity, flow, and overall readability while maintaining the original tone and meaning. Return only the improved text. Text to improve:\n\n${text}`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

export const generateExcerpt = async (content: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `You are a content strategist. Read the following blog post and write a compelling, concise excerpt (summary) of no more than 160 characters. The excerpt should be engaging and entice users to read the full article. Return only the excerpt text. Blog post content:\n\n${content}`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    const fullPrompt = `${prompt}, digital art, high detail, cinematic lighting, professional quality`;
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error('The model did not return an image. This could be due to a safety filter. Try rephrasing your prompt.');
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
};

export const generateSeoMetadata = async (content: string, focusKeyword: string): Promise<{ metaTitle: string; metaDescription: string; }> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Act as an expert SEO copywriter. Based on the following blog post content and focus keyword, generate an optimized meta title and meta description.
    
    Rules:
    - The meta title must be compelling and around 50-60 characters.
    - The meta description must be engaging, around 140-160 characters, and include a call-to-action if appropriate.
    - Both the title and description should naturally include the focus keyword.
    
    Focus Keyword: "${focusKeyword}"
    
    Blog Content:
    ---
    ${content.substring(0, 3000)}
    ---
    
    Return the result in JSON format.`;
    
    const seoSchema = {
        type: Type.OBJECT,
        properties: {
            metaTitle: { type: Type.STRING, description: "The optimized meta title (50-60 characters)." },
            metaDescription: { type: Type.STRING, description: "The optimized meta description (140-160 characters)." },
        },
        required: ["metaTitle", "metaDescription"],
    };

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: seoSchema,
        }
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as { metaTitle: string; metaDescription: string; };
};