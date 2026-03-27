import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResult } from '../types';

export async function analyzeIcon(
  imageBase64: string,
  apiKey: string
): Promise<AnalysisResult> {
  if (!apiKey) {
    throw new Error('请先设置 Gemini API Key');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `请分析这个图标图片，提供以下信息（以 JSON 格式返回）：

{
  "chineseKeywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"],
  "englishKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "style": "图标风格（如：扁平、线性、填充、渐变等）",
  "theme": "主题分类（如：商务、科技、生活、教育等）"
}

要求：
1. 提供 5-8 个精准的中文关键词
2. 提供 5-8 个对应的英文关键词
3. 关键词要能准确描述图标的含义、用途和视觉特征
4. 只返回 JSON，不要其他解释`;

  try {
    const mimeType = imageBase64.startsWith('data:image/png')
      ? 'image/png'
      : imageBase64.startsWith('data:image/jpeg') || imageBase64.startsWith('data:image/jpg')
      ? 'image/jpeg'
      : imageBase64.startsWith('data:image/webp')
      ? 'image/webp'
      : 'image/png';

    const base64Data = imageBase64.split(',')[1];

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      },
    ]);

    const response = result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('无法解析 AI 返回的结果');
    }

    const parsed = JSON.parse(jsonMatch[0]) as AnalysisResult;
    
    if (!parsed.chineseKeywords || !parsed.englishKeywords) {
      throw new Error('AI 返回的数据格式不正确');
    }

    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`分析失败: ${error.message}`);
    }
    throw new Error('分析失败，请重试');
  }
}

export function validateApiKey(apiKey: string): boolean {
  return apiKey.trim().length > 0 && apiKey.startsWith('AIzaSy');
}
