package com.saidj.trainingcenter.excel;

import java.io.IOException;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.saidj.trainingcenter.model.User;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

public class TrainingParticipantsExporter {
	private XSSFWorkbook workbook;
	private XSSFSheet sheet;
	
	private Set<User> participants;
	
	public TrainingParticipantsExporter(Set<User> participants) {
		this.participants = participants;
		
		workbook = new XSSFWorkbook();
	}
	
	private void createCell(Row row, int columnCount, Object value, CellStyle style) {
		sheet.autoSizeColumn(columnCount);
		Cell cell = row.createCell(columnCount);
		
		if(value instanceof Long) {
			cell.setCellValue((Long) value);
		} else if(value instanceof Integer) {
			cell.setCellValue((Integer) value);
		} else if(value instanceof Boolean) {
			cell.setCellValue((Boolean) value);
		} else {
			cell.setCellValue((String) value);
		}
		
		cell.setCellStyle(style);
	}
	
	private void writeHeaderLine() {
		sheet = workbook.createSheet("Participants");
		
		Row row = sheet.createRow(0);
		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setFontHeight(20);
		style.setFont(font);
		style.setAlignment(HorizontalAlignment.CENTER);
		createCell(row, 0, "List Of Participants", style);
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
		font.setFontHeightInPoints((short) 10);
		
		row = sheet.createRow(1);
		font.setBold(true);
		font.setFontHeight(16);
		style.setFont(font);
		createCell(row, 0, "User ID", style);
		createCell(row, 1, "User Name", style);
		createCell(row, 2, "User Email", style);
		createCell(row, 3, "User Phone", style);
	}
	
	private void writeDataLines() {
		System.out.println("writeDataLines !");
		int rowCount = 2;
		
		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setFontHeight(14);
		style.setFont(font);
		
		for(User user : participants) {
			Row row = sheet.createRow(rowCount++);
			int columnCount = 0;
			createCell(row, columnCount++, user.getUserId(), style);
			createCell(row, columnCount++, user.getName(), style);
			createCell(row, columnCount++, user.getEmail(), style);
			createCell(row, columnCount++, user.getPhone(), style);
		}
	}
	
	public void export(HttpServletResponse response) throws IOException {
		System.out.println("EXPORT !");
		writeHeaderLine();
		writeDataLines();
		
		ServletOutputStream outputStream = response.getOutputStream();
		workbook.write(outputStream);
		workbook.close();
		outputStream.close();
	}
	
}
