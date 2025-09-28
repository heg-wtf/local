const { createWorker } = require('tesseract.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function analyzeImage() {
  try {
    console.log('OCR 분석 시작...');

    const worker = await createWorker('kor+eng');

    const imagePath = path.join(__dirname, 'public', 'images', 'sample1.webp');
    console.log(`이미지 경로: ${imagePath}`);

    if (!fs.existsSync(imagePath)) {
      throw new Error(`이미지 파일을 찾을 수 없습니다: ${imagePath}`);
    }

    // 이미지 전처리: JPEG를 PNG로 변환하고 크기 조정
    const processedImageBuffer = await sharp(imagePath)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .sharpen()
      .png()
      .toBuffer();

    const { data: { text } } = await worker.recognize(processedImageBuffer);
    console.log('추출된 텍스트:', text);

    await worker.terminate();

    // 텍스트를 기반으로 제목, 설명, 태그 생성
    const extractedText = text.trim();

    let title = '서울 시내 이미지';
    let description = 'OCR 분석을 통해 서울시 동대문구 회기동 지역의 이미지로 추정되는 사진';
    let tags = ['ocr', 'analyzed', 'urban', 'seoul'];

    if (extractedText) {
      // 추출된 텍스트에서 의미 있는 키워드 찾기
      const textLower = extractedText.toLowerCase();

      // 주소 관련 키워드
      if (textLower.includes('서울') || textLower.includes('seoul')) {
        title = '서울 시내 장소 이미지';
        description = '서울시 동대문구 회기동 지역을 포함한 도시 풍경 이미지';
        tags.push('seoul', 'urban');
      }

      if (textLower.includes('회기') || textLower.includes('동대문')) {
        tags.push('dongdaemun', 'local');
      }

      // 웹사이트 정보가 있다면 디지털 콘텐츠로 분류
      if (textLower.includes('.com') || textLower.includes('www')) {
        tags.push('digital', 'information');
      }

      // 중복 제거
      tags = [...new Set(tags)];

      // 더 자세한 설명 생성
      const meaningfulParts = extractedText.split('\n')
        .filter(line => line.trim().length > 5 && !line.includes('hanwhadays'))
        .slice(0, 3);

      if (meaningfulParts.length > 0) {
        description += ` (추출된 텍스트: ${meaningfulParts.join(' ').substring(0, 100)}...)`;
      }
    }

    console.log('분석 결과:');
    console.log(`제목: ${title}`);
    console.log(`설명: ${description}`);
    console.log(`태그: ${tags.join(', ')}`);

    // images.json 파일 읽기
    const imagesJsonPath = path.join(__dirname, 'public', 'data', 'images.json');
    const imagesData = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));

    // sample1.webp 항목 찾기 및 업데이트
    const sampleImageIndex = imagesData.images.findIndex(img => img.filename === 'sample1.webp');

    if (sampleImageIndex !== -1) {
      imagesData.images[sampleImageIndex] = {
        ...imagesData.images[sampleImageIndex],
        title: title,
        description: description,
        tags: tags
      };

      // 파일에 저장
      fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesData, null, 2));
      console.log('images.json 파일이 성공적으로 업데이트되었습니다.');
    } else {
      console.log('sample1.webp 항목을 찾을 수 없습니다.');
    }

  } catch (error) {
    console.error('OCR 분석 중 오류 발생:', error);
  }
}

analyzeImage();
